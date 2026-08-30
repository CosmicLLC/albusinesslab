import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import { IntroGate } from "@/components/IntroAnimation";
import Home from "@/pages/home";
import Services from "@/pages/services";
import System from "@/pages/system";
import Training from "@/pages/training";
import Insights from "@/pages/insights";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import WebsiteBuilder from "@/pages/website-builder";
import WorkforceTrainingFundAiTraining from "@/pages/workforce-training-fund-ai-training";
import AiConsultingVsHiringInHouse from "@/pages/vs/ai-consulting-vs-hiring-in-house";
import AiAutomationAgencyVsSoftwareVendor from "@/pages/vs/ai-automation-agency-vs-software-vendor";
import TradesHomeServices from "@/pages/industries/trades-home-services";
import Retail from "@/pages/industries/retail";
import ProfessionalServices from "@/pages/industries/professional-services";
import BostonMa from "@/pages/ai-consulting/boston-ma";
import WorcesterMa from "@/pages/ai-consulting/worcester-ma";
import QuincyMa from "@/pages/ai-consulting/quincy-ma";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/system" component={System} />
        <Route path="/training" component={Training} />
        <Route path="/insights" component={Insights} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/website-builder" component={WebsiteBuilder} />
        {/* Keep this list in sync with src/seo/routes.json (used to generate sitemap.xml) */}
        <Route path="/workforce-training-fund-ai-training" component={WorkforceTrainingFundAiTraining} />
        <Route path="/vs/ai-consulting-vs-hiring-in-house" component={AiConsultingVsHiringInHouse} />
        <Route path="/vs/ai-automation-agency-vs-software-vendor" component={AiAutomationAgencyVsSoftwareVendor} />
        <Route path="/industries/trades-home-services" component={TradesHomeServices} />
        <Route path="/industries/retail" component={Retail} />
        <Route path="/industries/professional-services" component={ProfessionalServices} />
        <Route path="/ai-consulting/boston-ma" component={BostonMa} />
        <Route path="/ai-consulting/worcester-ma" component={WorcesterMa} />
        <Route path="/ai-consulting/quincy-ma" component={QuincyMa} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <IntroGate>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </IntroGate>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
