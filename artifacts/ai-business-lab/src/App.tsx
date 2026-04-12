import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/home";
import Services from "@/pages/services";
import System from "@/pages/system";
import Training from "@/pages/training";
import Insights from "@/pages/insights";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import WebsiteBuilder from "@/pages/website-builder";
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
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
