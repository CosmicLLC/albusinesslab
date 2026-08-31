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
import InsightsPost from "@/pages/insights/post";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import WebsiteBuilder from "@/pages/website-builder";
import WorkforceTrainingFundAiTraining from "@/pages/workforce-training-fund-ai-training";
import ComparisonsIndex from "@/pages/vs/index";
import AiConsultingVsHiringInHouse from "@/pages/vs/ai-consulting-vs-hiring-in-house";
import AiAutomationAgencyVsSoftwareVendor from "@/pages/vs/ai-automation-agency-vs-software-vendor";
import IndustriesIndex from "@/pages/industries/index";
import TradesHomeServices from "@/pages/industries/trades-home-services";
import Retail from "@/pages/industries/retail";
import ProfessionalServices from "@/pages/industries/professional-services";
import LocationsIndex from "@/pages/ai-consulting/index";
import BostonMa from "@/pages/ai-consulting/boston-ma";
import WorcesterMa from "@/pages/ai-consulting/worcester-ma";
import QuincyMa from "@/pages/ai-consulting/quincy-ma";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

/**
 * Route table. Every indexable path here MUST have a matching entry in
 * src/seo/pages.ts — scripts/verify-seo.mjs fails the build if they drift,
 * since a route missing from the registry ships with no metadata and never
 * reaches the sitemap.
 */
function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/system" component={System} />
        <Route path="/training" component={Training} />
        <Route path="/insights" component={Insights} />
        {/* One dynamic route, but the prerenderer emits a static file per slug
            from the registry, so each post ships as its own crawlable page. */}
        <Route path="/insights/:slug" component={InsightsPost} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/website-builder" component={WebsiteBuilder} />

        <Route path="/workforce-training-fund-ai-training" component={WorkforceTrainingFundAiTraining} />

        <Route path="/vs" component={ComparisonsIndex} />
        <Route path="/vs/ai-consulting-vs-hiring-in-house" component={AiConsultingVsHiringInHouse} />
        <Route path="/vs/ai-automation-agency-vs-software-vendor" component={AiAutomationAgencyVsSoftwareVendor} />

        <Route path="/industries" component={IndustriesIndex} />
        <Route path="/industries/trades-home-services" component={TradesHomeServices} />
        <Route path="/industries/retail" component={Retail} />
        <Route path="/industries/professional-services" component={ProfessionalServices} />

        <Route path="/ai-consulting" component={LocationsIndex} />
        <Route path="/ai-consulting/boston-ma" component={BostonMa} />
        <Route path="/ai-consulting/worcester-ma" component={WorcesterMa} />
        <Route path="/ai-consulting/quincy-ma" component={QuincyMa} />

        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

/**
 * `ssrPath` is supplied only by the prerenderer (src/entry-server.tsx) to render
 * a specific route to static HTML. In the browser it stays undefined and wouter
 * reads the real location, which is what makes the prerendered markup hydrate
 * cleanly.
 */
function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <IntroGate>
          <WouterRouter
            base={import.meta.env.BASE_URL.replace(/\/$/, "")}
            ssrPath={ssrPath}
          >
            <Router />
          </WouterRouter>
          <Toaster />
        </IntroGate>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
