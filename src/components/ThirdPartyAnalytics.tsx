import { useEffect } from 'react';

interface ThirdPartyAnalyticsProps {
  googleAnalyticsId?: string;
  microsoftClarityId?: string;
}

export const ThirdPartyAnalytics = ({ googleAnalyticsId, microsoftClarityId }: ThirdPartyAnalyticsProps) => {
  useEffect(() => {
    // Google Analytics 4
    if (googleAnalyticsId) {
      // Load GA4 script
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(gaScript);

      // Initialize GA4
      const gaConfigScript = document.createElement('script');
      gaConfigScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsId}', {
          page_path: window.location.pathname,
          send_page_view: true
        });
      `;
      document.head.appendChild(gaConfigScript);

      console.log('✅ Google Analytics 4 initialized:', googleAnalyticsId);
    }

    // Microsoft Clarity
    if (microsoftClarityId) {
      const clarityScript = document.createElement('script');
      clarityScript.type = 'text/javascript';
      clarityScript.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${microsoftClarityId}");
      `;
      document.head.appendChild(clarityScript);

      console.log('✅ Microsoft Clarity initialized:', microsoftClarityId);
    }
  }, [googleAnalyticsId, microsoftClarityId]);

  return null;
};