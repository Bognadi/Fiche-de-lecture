import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, CheckCircle2, Circle, GraduationCap, FileText, Lightbulb, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export default function MethodologySection({ methodology, fiches, onBack, onProgress }) {
  const [completedFiches, setCompletedFiches] = useState(new Set(methodology.progress.fichesSeen));
  const [expandedFiche, setExpandedFiche] = useState(null);

  const markFicheComplete = (ficheId) => {
    if (!completedFiches.has(ficheId)) {
      setCompletedFiches(prev => new Set([...prev, ficheId]));
      onProgress(methodology.id, ficheId);
    }
  };

  const toggleFicheExpansion = (ficheId) => {
    setExpandedFiche(expandedFiche === ficheId ? null : ficheId);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{methodology.title}</h1>
            <p className="text-lg text-muted-foreground">{methodology.description}</p>
          </div>
          <Badge variant="secondary">
            {methodology.progress.completed} / {methodology.progress.total} fiches vues
          </Badge>
        </div>

        <Card className={methodology.color}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Fiches méthodologiques pour le programme PCSI
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Fiches Content */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Fiches méthodologiques</h2>
          <div className="grid gap-4">
            {fiches.map((fiche) => {
              const isCompleted = completedFiches.has(fiche.id);
              const isExpanded = expandedFiche === fiche.id;
              
              return (
                <Card key={fiche.id} className={`transition-all duration-200 ${isCompleted ? 'bg-green-50 border-green-200' : 'hover:shadow-md'}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markFicheComplete(fiche.id)}
                            className="p-0 h-6 w-6"
                          >
                            {isCompleted ? 
                              <CheckCircle2 className="h-5 w-5 text-green-600" /> : 
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            }
                          </Button>
                          <Badge variant="outline" className="text-xs">
                            {fiche.group}
                          </Badge>
                        </div>
                        <CardTitle className={`text-lg ${isCompleted ? 'text-green-800' : ''}`}>
                          {fiche.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-2">
                          {fiche.summary}
                        </p>
                      </div>
                      {/* Fiche number badge */}
                      {fiche.fiche_numero && (
                        <Badge variant="secondary" className="ml-2 text-xs self-start">
                          #{fiche.fiche_numero}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          Concepts clés
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {fiche.concepts.map((concept, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {concept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => toggleFicheExpansion(fiche.id)}
                        variant="outline"
                        className="flex-1"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        {isExpanded ? 'Masquer le détail' : 'Voir le détail'}
                      </Button>
                      
                      {!isCompleted && (
                        <Button 
                          onClick={() => markFicheComplete(fiche.id)}
                          className="flex-1"
                        >
                          Marquer comme vue
                        </Button>
                      )}
                    </div>

                    {isExpanded && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                        <h4 className="font-semibold">Développement détaillé</h4>
                        {fiche.detailedSections.map((section, index) => (
                          <div key={index} className="space-y-2">
                            <h5 className="font-medium text-sm">{section.title}</h5>
                            <p className="text-sm text-muted-foreground">{section.content}</p>
                          </div>
                        ))}
                        
                        <div className="mt-4">
                          <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Questions de réflexion
                          </h5>
                          <ul className="space-y-1">
                            {fiche.questions.map((question, index) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                • {question}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}