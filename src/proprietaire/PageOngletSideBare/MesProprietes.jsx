import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Download, Plus, Edit, Trash2, Eye, MapPin, Home, Building } from 'lucide-react';

export default function Properties({ 
  setIsModalOpen,
  formatCurrency = (amount) => new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA'
}) {    
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  
  // Données d'exemple des propriétés
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Villa 5 pièces moderne",
      address: "Cocody Angré, Zone 4",
      price: 500000,
      type: "Villa",
      status: "loué",
      tenant: "Jean Kouassi",
      bedrooms: 5,
      bathrooms: 3,
      size: "250m²",
      addedDate: "2024-01-15",
      image: "🏠"
    },
    {
      id: 2,
      title: "Studio moderne centre-ville",
      address: "Yopougon Sicogi",
      price: 100000,
      type: "Studio",
      status: "disponible",
      tenant: null,
      bedrooms: 1,
      bathrooms: 1,
      size: "45m²",
      addedDate: "2024-02-01",
      image: "🏢"
    },
    {
      id: 3,
      title: "Appartement 3 pièces",
      address: "Marcory Résidentiel",
      price: 250000,
      type: "Appartement",
      status: "en_vente",
      tenant: null,
      bedrooms: 3,
      bathrooms: 2,
      size: "120m²",
      addedDate: "2024-01-30",
      image: "🏘️"
    },
    {
      id: 4,
      title: "Duplex luxueux",
      address: "Riviera Golf, Cocody",
      price: 800000,
      type: "Duplex",
      status: "loué",
      tenant: "Marie Diallo",
      bedrooms: 4,
      bathrooms: 3,
      size: "300m²",
      addedDate: "2024-02-10",
      image: "🏛️"
    }
  ]);

  // Filtrer les propriétés
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status) => {
    switch (status) {
      case 'disponible':
        return { 
          label: 'Disponible', 
          className: 'bg-green-100 text-green-600',
          dot: 'bg-green-400'
        };
      case 'loué':
        return { 
          label: 'Loué', 
          className: 'bg-red-100 text-red-600',
          dot: 'bg-red-400'
        };
      case 'en_vente':
        return { 
          label: 'En vente', 
          className: 'bg-blue-100 text-blue-600',
          dot: 'bg-blue-400'
        };
      default:
        return { 
          label: 'Inconnu', 
          className: 'bg-gray-100 text-gray-600',
          dot: 'bg-gray-400'
        };
    }
  };

  const handlePropertyAction = (action, property) => {
    switch (action) {
      case 'edit':
        alert(`Modifier: ${property.title}`);
        break;
      case 'delete':
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${property.title}" ?`)) {
          setProperties(properties.filter(p => p.id !== property.id));
        }
        break;
      case 'view':
        alert(`Voir détails: ${property.title}`);
        break;
      default:
        break;
    }
  };

  const exportData = () => {
    alert('Exportation des données en cours...');
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
            <h1 className="text-2xl font-bold text-gray-900">Mes Propriétés</h1>
            <p className="text-gray-600 text-sm mt-1">Gérez toutes vos propriétés immobilières</p>
          </div>
         <button
                        // onClick={() => setIsModalOpen(true)}
                        onClick={() => {
                          
                            setIsModalOpen(true);
                            
                        }
                        }
                        className="bg-gradient-to-r from-red-400 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg text-sm"
                    >
                        + Ajouter Propriété
                    </button>
        </div>

        {/* Barre de filtres et recherche */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Barre de recherche */}
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher par titre, quartier, type..."
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
                <option value="disponible">Disponible</option>
                <option value="loué">Loué</option>
                <option value="en_vente">En vente</option>
              </select>

              {/* Boutons de vue */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-red-400 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-red-400 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List size={18} />
                </button>
              </div>

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

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-400 rounded-lg flex items-center justify-center text-white">
                <Home size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{properties.length}</div>
                <div className="text-sm text-gray-600">Total propriétés</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg flex items-center justify-center text-white">
                <Building size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {properties.filter(p => p.status === 'loué').length}
                </div>
                <div className="text-sm text-gray-600">Propriétés louées</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white">
                💰
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(properties.filter(p => p.status === 'loué').reduce((sum, p) => sum + p.price, 0))}
                </div>
                <div className="text-sm text-gray-600">Revenus mensuels</div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des propriétés */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => {
              const statusConfig = getStatusConfig(property.status);
              return (
                <div
                  key={property.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl"
                >
                  {/* Image/Icône */}
                  <div className="w-full h-48 bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center text-white text-4xl">
                    {property.image}
                  </div>
                  
                  {/* Contenu */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{property.title}</h3>
                      {new Date(property.addedDate) > new Date(Date.now() - 7*24*60*60*1000) && (
                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-semibold">
                          ⚡ Nouveau
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin size={14} className="mr-1" />
                      {property.address}
                    </div>
                    
                    <div className="text-xl font-bold text-green-600 mb-3">
                      {formatCurrency(property.price)}/mois
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                      <span>{property.bedrooms} ch.</span>
                      <span>{property.bathrooms} sdb</span>
                      <span>{property.size}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${statusConfig.className}`}>
                        <div className={`w-2 h-2 rounded-full mr-1 ${statusConfig.dot}`}></div>
                        {statusConfig.label}
                      </div>
                      {property.tenant && (
                        <span className="text-xs text-gray-600">👤 {property.tenant}</span>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex justify-between">
                      <button
                        onClick={() => handlePropertyAction('view', property)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Eye size={14} />
                        Détails
                      </button>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handlePropertyAction('edit', property)}
                          className="p-1.5 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handlePropertyAction('delete', property)}
                          className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Vue en tableau */
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Propriété</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Adresse</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Prix</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Statut</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Locataire</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProperties.map((property) => {
                    const statusConfig = getStatusConfig(property.status);
                    return (
                      <tr key={property.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg flex items-center justify-center text-white text-sm">
                              {property.image}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{property.title}</div>
                              <div className="text-sm text-gray-600">{property.type} • {property.size}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{property.address}</td>
                        <td className="py-4 px-4 font-semibold text-green-600">{formatCurrency(property.price)}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${statusConfig.className}`}>
                            <div className={`w-2 h-2 rounded-full mr-1 ${statusConfig.dot}`}></div>
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{property.tenant || '-'}</td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handlePropertyAction('view', property)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handlePropertyAction('edit', property)}
                              className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handlePropertyAction('delete', property)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
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
        )}

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune propriété trouvée</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Essayez de modifier vos filtres de recherche'
                : 'Commencez par ajouter votre première propriété'
              }
            </p>
            <button
              onClick={() => setIsModalOpen && setIsModalOpen(true)}
              className="bg-gradient-to-r from-red-400 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
            >
              Ajouter une propriété
            </button>
          </div>
        )}
      </div>
    </div>
  );
}