import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    watsonAssistantChatOptions?: {
      integrationID: string;
      region: string;
      serviceInstanceID: string;
      onLoad: (instance: any) => Promise<void>;
      clientVersion?: string;
    };
  }
}

const WatsonChat = () => {
  const pathname = usePathname();
  const scriptSrc =
    "https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js";

  useEffect(() => {
    const loadScript = () => {
      if (
        typeof window !== "undefined" &&
        !document.querySelector(`script[src="${scriptSrc}"]`)
      ) {
        window.watsonAssistantChatOptions = {
          integrationID: "c0ba60ee-9e36-4e4d-97fc-083b2616a224",
          region: "us-south",
          serviceInstanceID: "2ca88fc0-f00d-49b1-a9d2-f6ae137d9cf7",
          onLoad: async (instance) => {
            await instance.render();
          },
        };

        const script = document.createElement("script");
        script.src = scriptSrc;
        document.head.appendChild(script);
      }
    };

    if (pathname === "/") {
      loadScript();
    }

    return () => {
      if (typeof window !== "undefined") {
        const scriptElement = document.querySelector(
          `script[src="${scriptSrc}"]`
        );
        if (scriptElement) {
          scriptElement.parentNode?.removeChild(scriptElement);
        }
      }
    };
  }, [pathname]);

  return pathname === "/" ? <div id="watson-chat-container"></div> : null;
};

export default WatsonChat;
