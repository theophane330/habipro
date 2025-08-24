import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, Eye, Edit, Trash2, Phone, Mail, MessageSquare, FileText, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function Tenants({
    setIsTenantModalOpen,
    formatCurrency = (amount) => new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA'
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [propertyFilter, setPropertyFilter] = useState('all');

    // Données d'exemple des locataires
    const [tenants, setTenants] = useState([
        {
            id: 1,
            firstName: "Jean",
            lastName: "Kouassi",
            phone: "07 89 45 12 34",
            email: "jean.kouassi@email.ci",
            property: "Villa 5p Cocody",
            propertyId: 1,
            rent: 500000,
            contractStatus: "actif",
            paymentStatus: "a_jour",
            nextPayment: "2025-09-05",
            contractStart: "2024-01-01",
            contractEnd: "2025-12-31",
            lastPayment: "2025-08-01",
            avatar: "JK"
        },
        {
            id: 2,
            firstName: "Mariam",
            lastName: "Diallo",
            phone: "01 25 36 48 59",
            email: "mariam.diallo@email.ci",
            property: "Studio Yopougon",
            propertyId: 2,
            rent: 100000,
            contractStatus: "actif",
            paymentStatus: "impaye",
            nextPayment: "2025-08-10",
            contractStart: "2024-03-01",
            contractEnd: "2026-02-28",
            lastPayment: "2025-07-01",
            avatar: "MD"
        },
        {
            id: 3,
            firstName: "Paul",
            lastName: "Adjoua",
            phone: "05 36 78 45 62",
            email: "paul.adjoua@email.ci",
            property: "Appartement Plateau",
            propertyId: 3,
            rent: 300000,
            contractStatus: "en_attente",
            paymentStatus: "en_attente",
            nextPayment: "2025-09-01",
            contractStart: "2025-09-01",
            contractEnd: "2026-08-31",
            lastPayment: null,
            avatar: "PA"
        },
        {
            id: 4,
            firstName: "Awa",
            lastName: "Traoré",
            phone: "02 47 58 96 31",
            email: "awa.traore@email.ci",
            property: "Villa Riviera",
            propertyId: 4,
            rent: 750000,
            contractStatus: "actif",
            paymentStatus: "retard",
            nextPayment: "2025-08-20",
            contractStart: "2023-06-01",
            contractEnd: "2025-05-31",
            lastPayment: "2025-07-20",
            avatar: "AT"
        }
    ]);

    // Liste des propriétés pour le filtre
    const properties = [
        { id: 1, name: "Villa 5p Cocody" },
        { id: 2, name: "Studio Yopougon" },
        { id: 3, name: "Appartement Plateau" },
        { id: 4, name: "Villa Riviera" }
    ];

    // Filtrer les locataires
    const filteredTenants = tenants.filter(tenant => {
        const matchesSearch =
            tenant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.phone.includes(searchTerm) ||
            tenant.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || tenant.paymentStatus === statusFilter;
        const matchesProperty = propertyFilter === 'all' || tenant.propertyId.toString() === propertyFilter;

        return matchesSearch && matchesStatus && matchesProperty;
    });

    const getStatusConfig = (status) => {
        switch (status) {
            case 'a_jour':
                return {
                    label: '✅ À jour',
                    className: 'bg-green-100 text-green-600',
                    icon: CheckCircle,
                    color: 'text-green-600'
                };
            case 'impaye':
                return {
                    label: '❌ Impayé',
                    className: 'bg-red-100 text-red-600',
                    icon: AlertCircle,
                    color: 'text-red-600'
                };
            case 'retard':
                return {
                    label: '🟡 Retard',
                    className: 'bg-yellow-100 text-yellow-600',
                    icon: Clock,
                    color: 'text-yellow-600'
                };
            case 'en_attente':
                return {
                    label: '🟡 En attente',
                    className: 'bg-blue-100 text-blue-600',
                    icon: Clock,
                    color: 'text-blue-600'
                };
            default:
                return {
                    label: 'Inconnu',
                    className: 'bg-gray-100 text-gray-600',
                    icon: AlertCircle,
                    color: 'text-gray-600'
                };
        }
    };

    const getContractStatusConfig = (status) => {
        switch (status) {
            case 'actif':
                return { label: 'Actif', className: 'bg-green-100 text-green-600' };
            case 'resilie':
                return { label: 'Résilié', className: 'bg-red-100 text-red-600' };
            case 'en_attente':
                return { label: 'En attente', className: 'bg-blue-100 text-blue-600' };
            default:
                return { label: 'Inconnu', className: 'bg-gray-100 text-gray-600' };
        }
    };

    const handleTenantAction = (action, tenant) => {
        switch (action) {
            case 'view':
                alert(`Voir détails: ${tenant.firstName} ${tenant.lastName}`);
                break;
            case 'edit':
                alert(`Modifier: ${tenant.firstName} ${tenant.lastName}`);
                break;
            case 'delete':
                if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${tenant.firstName} ${tenant.lastName}" ?`)) {
                    setTenants(tenants.filter(t => t.id !== tenant.id));
                }
                break;
            case 'reminder':
                alert(`Rappel de paiement envoyé à ${tenant.firstName} ${tenant.lastName}`);
                break;
            case 'contract':
                alert(`Ouverture du contrat de ${tenant.firstName} ${tenant.lastName}`);
                break;
            case 'history':
                alert(`Historique des paiements de ${tenant.firstName} ${tenant.lastName}`);
                break;
            default:
                break;
        }
    };

    const exportData = () => {
        alert('Exportation des données en cours...');
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    const isOverdue = (nextPayment) => {
        return new Date(nextPayment) < new Date();
    };

    // Statistiques
    const stats = {
        total: tenants.length,
        active: tenants.filter(t => t.contractStatus === 'actif').length,
        overdue: tenants.filter(t => t.paymentStatus === 'impaye').length,
        totalRevenue: tenants.filter(t => t.contractStatus === 'actif').reduce((sum, t) => sum + t.rent, 0)
    };

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);


    return (
        // <div className="flex-1 flex p-4 gap-4 overflow-y-auto">
        <div className={`
  flex-1 flex p-4 gap-4 overflow-y-auto
  transform transition-all duration-700 ease-out
  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
`}>
            <div className="flex-1">
                {/* En-tête avec titre et bouton principal */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Gestion des Locataires</h1>
                        <p className="text-gray-600 text-sm mt-1">Gérez tous vos locataires et leurs paiements</p>
                    </div>
                    <button
                        // onClick={() => setIsModalOpen(true)}
                        onClick={() => setIsTenantModalOpen && setIsTenantModalOpen(true)}
                        className="bg-gradient-to-r from-red-400 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg text-sm"
                    >
                        + Ajouter un locataire
                    </button>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white">
                                👥
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                                <div className="text-sm text-gray-600">Total locataires</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-400 rounded-lg flex items-center justify-center text-white">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
                                <div className="text-sm text-gray-600">Contrats actifs</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg flex items-center justify-center text-white">
                                <AlertCircle size={20} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{stats.overdue}</div>
                                <div className="text-sm text-gray-600">Impayés</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white">
                                💰
                            </div>
                            <div>
                                <div className="text-lg font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</div>
                                <div className="text-sm text-gray-600">Revenus mensuels</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barre de filtres et recherche */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        {/* Barre de recherche */}
                        <div className="relative flex-1 min-w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Rechercher par nom, téléphone ou email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Filtre par statut */}
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="a_jour">À jour</option>
                                <option value="impaye">Impayé</option>
                                <option value="retard">En retard</option>
                                <option value="en_attente">En attente</option>
                            </select>

                            {/* Filtre par propriété */}
                            <select
                                value={propertyFilter}
                                onChange={(e) => setPropertyFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"
                            >
                                <option value="all">Toutes les propriétés</option>
                                {properties.map(property => (
                                    <option key={property.id} value={property.id.toString()}>
                                        {property.name}
                                    </option>
                                ))}
                            </select>

                            {/* Bouton export */}
                            <button
                                onClick={exportData}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
                            >
                                <Download size={18} />
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tableau des locataires */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Locataire</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Contact</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Propriété</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Loyer mensuel</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Statut</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Prochain paiement</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTenants.map((tenant) => {
                                    const statusConfig = getStatusConfig(tenant.paymentStatus);
                                    const contractConfig = getContractStatusConfig(tenant.contractStatus);
                                    const isPaymentOverdue = isOverdue(tenant.nextPayment) && tenant.paymentStatus !== 'a_jour';

                                    return (
                                        <tr key={tenant.id} className={`border-b border-gray-100 hover:bg-gray-50 ${isPaymentOverdue ? 'bg-red-50' : ''}`}>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                                        {tenant.avatar}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">
                                                            {tenant.firstName} {tenant.lastName}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${contractConfig.className}`}>
                                                                {contractConfig.label}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4 px-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Phone size={14} />
                                                        {tenant.phone}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Mail size={14} />
                                                        {tenant.email}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4 px-4">
                                                <div className="font-medium text-gray-900">{tenant.property}</div>
                                                <div className="text-sm text-gray-600">
                                                    {formatDate(tenant.contractStart)} - {formatDate(tenant.contractEnd)}
                                                </div>
                                            </td>

                                            <td className="py-4 px-4">
                                                <div className="font-semibold text-green-600">
                                                    {formatCurrency(tenant.rent)}
                                                </div>
                                            </td>

                                            <td className="py-4 px-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${statusConfig.className}`}>
                                                    {statusConfig.label}
                                                </span>
                                                {isPaymentOverdue && (
                                                    <div className="text-xs text-red-600 mt-1 font-medium">
                                                        ⚠️ En retard depuis {Math.floor((new Date() - new Date(tenant.nextPayment)) / (1000 * 60 * 60 * 24))} jour(s)
                                                    </div>
                                                )}
                                            </td>

                                            <td className="py-4 px-4">
                                                <div className={`font-medium ${isPaymentOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                                                    {formatDate(tenant.nextPayment)}
                                                </div>
                                                {tenant.lastPayment && (
                                                    <div className="text-xs text-gray-500">
                                                        Dernier: {formatDate(tenant.lastPayment)}
                                                    </div>
                                                )}
                                            </td>

                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-1">
                                                    {/* Actions principales */}
                                                    <button
                                                        onClick={() => handleTenantAction('view', tenant)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Voir détails"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleTenantAction('edit', tenant)}
                                                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleTenantAction('delete', tenant)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Supprimer"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>

                                                    {/* Actions spéciales */}
                                                    {(tenant.paymentStatus === 'impaye' || tenant.paymentStatus === 'retard') && (
                                                        <button
                                                            onClick={() => handleTenantAction('reminder', tenant)}
                                                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                                            title="Envoyer rappel"
                                                        >
                                                            <MessageSquare size={16} />
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => handleTenantAction('contract', tenant)}
                                                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                        title="Voir contrat"
                                                    >
                                                        <FileText size={16} />
                                                    </button>

                                                    <button
                                                        onClick={() => handleTenantAction('history', tenant)}
                                                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                        title="Historique des paiements"
                                                    >
                                                        <Calendar size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {filteredTenants.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-4">👥</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun locataire trouvé</h3>
                        <p className="text-gray-600 mb-4">
                            {searchTerm || statusFilter !== 'all' || propertyFilter !== 'all'
                                ? 'Essayez de modifier vos filtres de recherche'
                                : 'Commencez par ajouter votre premier locataire'
                            }
                        </p>
                        <button
                            onClick={() => setIsTenantModalOpen && setIsTenantModalOpen(true)}
                            className="bg-gradient-to-r from-red-400 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            Ajouter un locataire
                        </button>
                    </div>
                )}

                {/* Alertes importantes */}
                {stats.overdue > 0 && (
                    <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="text-red-600" size={24} />
                            <div>
                                <h3 className="font-semibold text-red-900">
                                    ⚠️ Attention: {stats.overdue} locataire(s) en impayé
                                </h3>
                                <p className="text-red-700 text-sm mt-1">
                                    Vérifiez les paiements en retard et envoyez des rappels si nécessaire.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}