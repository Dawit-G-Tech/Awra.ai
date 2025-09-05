import { Suspense } from "react";
import { SettingsView } from "@/modules/settings/ui/views/settings-view";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

export default function SettingsPage() {
    return (
        <Suspense fallback={<LoadingState title="Loading Settings" description="This may take a few seconds..." />}>
            <SettingsView />
        </Suspense>
    );
}
