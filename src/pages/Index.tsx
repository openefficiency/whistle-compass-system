import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mic } from "lucide-react";
import HomeHeader from "@/components/HomeHeader";
import Footer from "@/components/Footer";
import VoiceAssistant from "@/components/VoiceAssistant";
import { useVoiceAI } from "@/hooks/useVoiceAI";

const Index = () => {
  const { startListening, isSupported } = useVoiceAI();

  const handleSpeakUpClick = () => {
    if (isSupported) {
      startListening();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <HomeHeader />
      
      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Speak Up. Be Heard.</h1>
                <p className="text-lg md:text-xl mb-8">
                  Our secure whistleblower system empowers you to report concerns with complete confidentiality. Your voice matters in creating a safer, more ethical workplace.
                </p>
                <Button 
                  size="lg" 
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                  onClick={handleSpeakUpClick}
                  disabled={!isSupported}
                >
                  <Mic className="mr-2 h-5 w-5" />
                  {isSupported ? "Speak Up Now" : "Voice Not Supported"}
                </Button>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/placeholder.svg" 
                  alt="Secure Communication" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Make The Call</h3>
                <p className="text-gray-600">Use our secure line to report your concerns. Your call is encrypted and your identity protected.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Report Investigation</h3>
                <p className="text-gray-600">Our trained investigators will review your report and take appropriate action.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Issue Resolution</h3>
                <p className="text-gray-600">Concerns are addressed professionally with updates on resolution progress.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trust & Security Section */}
        <section className="py-16 px-4 bg-gray-100">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Your Security Is Our Priority</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3">100% Anonymous</h3>
                <p className="text-gray-600">Your identity remains completely protected throughout the process.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3">Encrypted Communications</h3>
                <p className="text-gray-600">All calls and messages are securely encrypted end-to-end.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3">Non-Retaliation Policy</h3>
                <p className="text-gray-600">Strong protections against any form of retaliation.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3">Independent Review</h3>
                <p className="text-gray-600">Reports are reviewed by an independent ethics committee.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Voice AI Assistant */}
      <VoiceAssistant />
    </div>
  );
};

export default Index;
