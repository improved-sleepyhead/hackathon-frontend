import { Spinner } from "@/shared/ui/spinner";

const MainLoading = () => {
    return (
        <div className="h-full flex items-center justify-center">
            <Spinner size="lg"/>
        </div>
    );
};

export default MainLoading;