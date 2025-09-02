import React from 'react';
import { FileText, BookOpen, AlertTriangle, CheckCircle, Scale, X } from 'lucide-react';

const JuridiquePanel = ({ isOpen, onClose }) => {
  // Données mockées pour les documents juridiques
  const juridicalDocuments = [
    { name: "Bail commercial - Local rue Voltaire", updated: "2h", status: "Généré" },
    { name: "Congé locataire - Appartement Bellecour", updated: "1j", status: "En cours" },
    { name: "Révision loyer - Local commercial", updated: "3j", status: "Brouillon" },
    { name: "Procès-verbal état des lieux", updated: "1sem", status: "Généré" }
  ];

  // Données mockées pour les alertes
  const recentAlerts = [
    { type: 'INFO', message: 'Nouvelle réglementation sur les diagnostics énergétiques applicable dès janvier 2025', time: '2h' },
    { type: 'WARNING', message: 'Délai de préavis modifié pour les baux commerciaux en zone tendue', time: '1j' },
    { type: 'UPDATE', message: 'Mise à jour du modèle de bail meublé conforme à la loi ALUR', time: '3j' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Panneau latéral juridique */}
      <div className={`fixed right-0 top-0 h-full w-96 bg-gradient-to-b from-slate-50 to-slate-100/80 backdrop-blur-xl border-l border-slate-200/50 shadow-2xl transform transition-all duration-700 ease-out ${
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className="h-full overflow-y-auto p-6">
          {/* En-tête */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 flex items-center justify-center">
                <Scale size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-light text-xl text-slate-900">Assistant Juridique</h2>
                <p className="text-xs text-slate-500">IA spécialisée en droit immobilier</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-200/50 transition-colors duration-200"
            >
              <X size={20} className="text-slate-400" />
            </button>
          </div>

          {/* Documents récents */}
          <div className="mb-8">
            <h3 className="text-lg font-light text-slate-900 mb-4 tracking-wide">DOCUMENTS RÉCENTS</h3>
            <div className="space-y-3">
              {juridicalDocuments.map((doc, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        doc.status === 'Généré' ? 'bg-emerald-50 text-emerald-600' :
                        doc.status === 'En cours' ? 'bg-amber-50 text-amber-600' :
                        'bg-slate-50 text-slate-600'
                      }`}>
                        <FileText size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 text-sm">{doc.name}</h4>
                        <p className="text-xs text-slate-500 mt-1">Modifié il y a {doc.updated}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doc.status === 'Généré' ? 'bg-emerald-100 text-emerald-700' :
                        doc.status === 'En cours' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {doc.status}
                      </span>
                      <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 opacity-0 group-hover:opacity-100">
                        <FileText size={16} className="text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alertes réglementaires */}
          <div className="mb-8">
            <h3 className="text-lg font-light text-slate-900 mb-4 tracking-wide">ALERTES RÉGLEMENTAIRES</h3>
            <div className="space-y-3">
              {recentAlerts.map((alert, index) => (
                <div key={index} className={`p-4 rounded-xl border-l-4 ${
                  alert.type === 'INFO' ? 'bg-blue-50/50 border-blue-400' :
                  alert.type === 'WARNING' ? 'bg-amber-50/50 border-amber-400' :
                  'bg-slate-50/50 border-slate-400'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                        alert.type === 'INFO' ? 'bg-blue-100 text-blue-600' :
                        alert.type === 'WARNING' ? 'bg-amber-100 text-amber-600' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {alert.type === 'INFO' && <BookOpen size={14} />}
                        {alert.type === 'WARNING' && <AlertTriangle size={14} />}
                        {alert.type === 'UPDATE' && <CheckCircle size={14} />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-700 leading-relaxed">{alert.message}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap ml-4">il y a {alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Veille législative */}
          <div className="mb-8">
            <h3 className="text-lg font-light text-slate-900 mb-4 tracking-wide">VEILLE LÉGISLATIVE</h3>
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-violet-500/10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Scale size={24} className="text-blue-400" />
                  <h4 className="font-medium">Intelligence Juridique IA</h4>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Notre système surveille en continu les évolutions réglementaires et vous alerte automatiquement des changements impactant vos biens immobiliers.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Sources surveillées', value: '247' },
                    { label: 'Mises à jour/jour', value: '18' },
                    { label: 'Précision', value: '99.2%' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-extralight text-white">{stat.value}</div>
                      <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Templates disponibles */}
          <div className="mb-8">
            <h3 className="text-lg font-light text-slate-900 mb-4 tracking-wide">TEMPLATES DISPONIBLES</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Bail meublé', category: 'CONTRATS', status: 'Mis à jour', icon: '🏠' },
                { name: 'Congé locataire', category: 'COURRIERS', status: 'Standard', icon: '📝' },
                { name: 'Procès-verbal', category: 'CONSTATS', status: 'Nouveau', icon: '📋' },
                { name: 'Révision loyer', category: 'INDEXATION', status: 'Automatique', icon: '📊' },
                { name: 'Caution solidaire', category: 'GARANTIES', status: 'Validé', icon: '🤝' },
                { name: 'Diagnostic loi Carrez', category: 'DIAGNOSTICS', status: 'Obligatoire', icon: '📏' }
              ].map((template, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-lg">{template.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-slate-900">{template.name}</h4>
                      <p className="text-xs text-slate-500">{template.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      template.status === 'Nouveau' ? 'bg-emerald-100 text-emerald-700' :
                      template.status === 'Obligatoire' ? 'bg-rose-100 text-rose-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {template.status}
                    </span>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Utiliser →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer du panneau avec statistiques */}
          <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-6 border border-white/30">
            <div className="grid grid-cols-4 gap-6 text-center">
              {[
                { label: 'Documents générés', value: '1,247', color: 'text-blue-600' },
                { label: 'Conformité', value: '100%', color: 'text-emerald-600' },
                { label: 'Temps économisé', value: '47h', color: 'text-amber-600' },
                { label: 'Erreurs évitées', value: '23', color: 'text-rose-600' }
              ].map((stat, index) => (
                <div key={index}>
                  <div className={`text-2xl font-extralight ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay pour fermer le panneau */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-700"
          onClick={onClose}
        />
      )}
    </div>
  );
};

export default JuridiquePanel;