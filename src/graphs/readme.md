# edashboard usage

this readme explains only how to render the full dashboard that shows all four charts.

## 1. import and use
place the dashboard component anywhere in your react + typescript app:

```tsx
import AquaCoreDashboard from "./components/aquacharts/aquacoredashboard";

export default function DashboardPage() {
  return <AquaCoreDashboard />;
}
