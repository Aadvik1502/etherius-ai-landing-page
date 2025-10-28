import React, { useState } from 'react';
import { InlineWidget } from 'react-calendly';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, X } from "lucide-react";

interface CalendlyWidgetProps {
  buttonText: string;
  buttonVariant?: 'primary' | 'secondary';
  buttonSize?: 'sm' | 'default' | 'lg';
  className?: string;
  calendlyUrl?: string;
}

export const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({
  buttonText,
  buttonVariant = 'primary',
  buttonSize = 'lg',
  className = '',
  calendlyUrl = 'https://calendly.com/team-etheriusai/30min' // Your actual Calendly URL
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openCalendly = () => {
    setIsOpen(true);
  };

  const closeCalendly = () => {
    setIsOpen(false);
  };

  const getButtonClasses = () => {
    const baseClasses = "group shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[48px]";

    if (buttonVariant === 'primary') {
      return `${baseClasses} bg-gradient-to-r from-neon-yellow to-green-400 text-black hover:from-neon-yellow/90 hover:to-green-400/90 neon-glow hover:shadow-neon-yellow/50`;
    } else {
      return `${baseClasses} border-2 border-neon-yellow text-neon-yellow hover:bg-neon-yellow hover:text-black`;
    }
  };

  return (
    <>
      <Button
        size={buttonSize}
        className={`${getButtonClasses()} ${className}`}
        onClick={openCalendly}
      >
        {buttonText}
        <ArrowRight className="ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
      </Button>

      {/* Calendly Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <Card className="w-full max-w-4xl mx-4 h-[90vh] bg-background border-border">
            <CardContent className="p-0 h-full relative">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={closeCalendly}
                className="absolute top-4 right-4 z-10 text-white hover:text-neon-yellow bg-black/50 hover:bg-black/70 min-h-[48px] min-w-[48px]"
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Calendly Widget */}
              <div className="h-full rounded-lg overflow-hidden">
                <InlineWidget
                  url={calendlyUrl}
                  styles={{
                    height: '100%',
                    minWidth: '320px',
                  }}
                  pageSettings={{
                    backgroundColor: '#0F172A', // Match your dark theme
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                    primaryColor: '#CEFC55', // Your neon yellow
                    textColor: '#FFFFFF'
                  }}
                  prefill={{
                    name: '',
                    email: '',
                    customAnswers: {
                      'Company Size': '',
                      'Industry': '',
                      'AI Experience': ''
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

// Alternative component for direct inline embedding (no modal)
interface CalendlyInlineProps {
  calendlyUrl?: string;
  className?: string;
  height?: string;
}

export const CalendlyInline: React.FC<CalendlyInlineProps> = ({
  calendlyUrl = 'https://calendly.com/team-etheriusai/30min', // Your actual Calendly URL
  className = '',
  height = '700px'
}) => {
  return (
    <div className={`w-full ${className}`}>
      <InlineWidget
        url={calendlyUrl}
        styles={{
          height: height,
          minWidth: '320px',
        }}
        pageSettings={{
          backgroundColor: '#0F172A', // Match your dark theme
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: '#CEFC55', // Your neon yellow
          textColor: '#FFFFFF'
        }}
        prefill={{
          name: '',
          email: '',
          customAnswers: {
            'Company Size': '',
            'Industry': '',
            'AI Experience': ''
          }
        }}
      />
    </div>
  );
};