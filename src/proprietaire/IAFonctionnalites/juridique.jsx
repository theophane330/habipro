import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

export default function BookCarouselPanel({ showPanel, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef(null);

  const books = [
    {
      id: 1,
      title: "Beauty and the Beast",
      subtitle: "Disney",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop&auto=format",
      gradient: "from-blue-900 via-blue-800 to-indigo-900"
    },
    {
      id: 2,
      title: "Fire and Blood - A Game of Thrones series",
      subtitle: "George RR Martin",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&auto=format",
      gradient: "from-red-900 via-orange-800 to-red-900"
    },
    {
      id: 3,
      title: "The Chronicles of Narnia",
      subtitle: "C.S. Lewis",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format",
      gradient: "from-slate-900 via-slate-800 to-slate-900"
    },
    {
      id: 4,
      title: "Deadpool Samurai edition Marvel",
      subtitle: "Marvel Comics",
      cover: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=400&fit=crop&auto=format",
      gradient: "from-red-900 via-black to-red-900"
    },
    {
      id: 5,
      title: "Document Juridique Immobilier",
      subtitle: "Droit français",
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop&auto=format",
      gradient: "from-emerald-900 via-teal-800 to-emerald-900"
    }
  ];

  const currentBook = books[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < books.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getBookScale = (index) => {
    if (index === currentIndex) return 'scale-110';
    if (Math.abs(index - currentIndex) === 1) return 'scale-95';
    return 'scale-75';
  };

  const getBookOpacity = (index) => {
    if (index === currentIndex) return 'opacity-100';
    if (Math.abs(index - currentIndex) === 1) return 'opacity-70';
    return 'opacity-40';
  };

  const getBookZIndex = (index) => {
    if (index === currentIndex) return 'z-30';
    if (Math.abs(index - currentIndex) === 1) return 'z-20';
    return 'z-10';
  };

  return (
    <>
      {/* Panneau de documents */}
      <div className={`fixed inset-y-0 right-0 w-5/6 bg-gradient-to-br from-stone-100 via-stone-50 to-stone-100 backdrop-blur-2xl shadow-2xl border-l border-stone-200/50 z-50 transform transition-transform duration-700 ease-out ${showPanel ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header du panneau */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-stone-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">📚</span>
              </div>
              <div>
                <h2 className="text-2xl font-light tracking-wide text-stone-800">BIBLIOTHÈQUE DOCUMENTAIRE</h2>
                <p className="text-stone-600 text-sm tracking-wide">GESTION INTELLIGENTE DES DOCUMENTS</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher un document..."
                  className="w-80 pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>
              
              <button 
                onClick={onClose}
                className="p-3 rounded-xl bg-stone-100 hover:bg-stone-200 transition-colors duration-300"
              >
                <X size={24} className="text-stone-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="h-full overflow-y-auto p-8">
          
          {/* Section principale */}
          <div className="mb-8">
            <h1 className="text-4xl font-light text-stone-800 mb-4">Continuez votre lecture..</h1>
            <p className="text-stone-600 leading-relaxed max-w-2xl mb-6">
              Reprenez là où vous vous êtes arrêté. Continuez la lecture de votre dernier document et plongez-vous dans l'univers juridique immobilier.
            </p>
            <button className="px-8 py-3 bg-stone-800 text-white rounded-lg font-medium hover:bg-stone-700 transition-colors duration-300 shadow-lg">
              Commencer la lecture →
            </button>
          </div>

          {/* Profil utilisateur */}
          <div className="flex items-center gap-6 mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">JD</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-stone-800 text-lg">Juriste Documentaliste</h3>
              <p className="text-stone-600">Spécialiste en droit immobilier</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-stone-600">En ligne</span>
            </div>
          </div>

          {/* Citation */}
          <div className="bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10"></div>
            <div className="relative z-10">
              <p className="text-stone-200 leading-relaxed italic text-lg">
                "La maîtrise documentaire est la clé d'une gestion immobilière efficace. Chaque contrat, chaque procédure doit être parfaitement archivé et accessible."
              </p>
            </div>
          </div>

          {/* Carousel de documents */}
          <div className="relative mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-stone-800">Documents en vedette</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-stone-200 hover:bg-white hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5 text-stone-600" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === books.length - 1}
                  className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-stone-200 hover:bg-white hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5 text-stone-600" />
                </button>
              </div>
            </div>

            <div className="relative h-96 overflow-hidden">
              <div 
                className="flex items-center justify-center gap-8 transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(${(2 - currentIndex) * 200}px)`
                }}
              >
                {books.map((book, index) => (
                  <div
                    key={book.id}
                    className={`relative transition-all duration-500 cursor-pointer ${getBookScale(index)} ${getBookOpacity(index)} ${getBookZIndex(index)}`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <div className="w-52 h-80 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
                      <div className={`w-full h-full bg-gradient-to-br ${book.gradient} relative group`}>
                        {/* Design de la couverture */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-white/20 rounded-2xl mx-auto mb-6 flex items-center justify-center backdrop-blur-sm border border-white/30">
                              <span className="text-3xl">
                                {book.title.includes('Juridique') ? '⚖️' : 
                                 book.title.includes('Fire') ? '🐉' :
                                 book.title.includes('Beast') ? '🏰' :
                                 book.title.includes('Narnia') ? '🦁' :
                                 book.title.includes('Deadpool') ? '💀' : '📚'}
                              </span>
                            </div>
                            <h3 className="text-white font-bold text-xl leading-tight mb-3">{book.title}</h3>
                            <p className="text-white/90 text-sm font-medium">{book.subtitle}</p>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-white/60 to-white/90 rounded-full transition-all duration-1000" 
                                style={{ width: `${Math.random() * 60 + 20}%` }}
                              ></div>
                            </div>
                            <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-white/60 to-white/90 rounded-full transition-all duration-1000" 
                                style={{ width: `${Math.random() * 80 + 10}%` }}
                              ></div>
                            </div>
                            <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-white/60 to-white/90 rounded-full transition-all duration-1000" 
                                style={{ width: `${Math.random() * 40 + 30}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Effet de brillance */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                      </div>
                    </div>
                    
                    {/* Informations sous le document */}
                    <div className="mt-4 text-center">
                      <h4 className="font-semibold text-stone-800 text-sm mb-1 leading-tight">
                        {book.title.length > 30 ? book.title.substring(0, 30) + '...' : book.title}
                      </h4>
                      <p className="text-stone-500 text-xs">{book.subtitle}</p>
                      {index === currentIndex && (
                        <div className="mt-2">
                          <div className="w-8 h-1 bg-orange-500 rounded-full mx-auto"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicateur de progression */}
            <div className="flex items-center justify-center mt-8 gap-3">
              {books.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-orange-500 w-12' : 'bg-stone-300 w-2'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Actions rapides */}
          <div className="mb-8">
            <h3 className="text-lg font-light text-stone-800 mb-4 tracking-wide">ACTIONS RAPIDES</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <span className="text-xl">📄</span>, title: 'Nouveau document', desc: 'Créer un contrat', color: 'bg-blue-50 text-blue-600 border-blue-200' },
                { icon: <span className="text-xl">⚖️</span>, title: 'Vérification légale', desc: 'Conformité réglementaire', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
                { icon: <span className="text-xl">📊</span>, title: 'Rapport mensuel', desc: 'Analytics documentaires', color: 'bg-amber-50 text-amber-600 border-amber-200' }
              ].map((action, index) => (
                <button key={index} className={`p-4 rounded-xl border-2 ${action.color} hover:shadow-lg transition-all duration-300 text-left group`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 group-hover:scale-110 transition-transform duration-300">
                      {action.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{action.title}</h4>
                      <p className="text-xs opacity-70 mt-1">{action.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Information de collection */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-stone-600">
                <span className="text-lg">📚</span>
                <span>Découvrez la <span className="text-orange-600 underline cursor-pointer font-medium">nouvelle collection</span> de modèles juridiques. Indispensable pour tout professionnel de l'immobilier !</span>
              </div>
              <div className="text-stone-500 font-medium">
                <span className="text-orange-600 text-lg">04</span> / 25 documents
              </div>
            </div>
            
            {/* Statistiques */}
            <div className="grid grid-cols-4 gap-6 text-center mt-6 pt-6 border-t border-stone-200">
              {[
                { label: 'Documents traités', value: '1,247', color: 'text-blue-600' },
                { label: 'Conformité', value: '100%', color: 'text-emerald-600' },
                { label: 'Temps économisé', value: '47h', color: 'text-amber-600' },
                { label: 'Erreurs évitées', value: '23', color: 'text-rose-600' }
              ].map((stat, index) => (
                <div key={index}>
                  <div className={`text-2xl font-light ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-xs text-stone-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Overlay pour fermer le panneau */}
      {showPanel && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-700"
          onClick={onClose}
        />
      )}
    </>
  );
}