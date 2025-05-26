interface MarketingLayoutProps {
    children: React.ReactNode;
}

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
    return ( 
        <main className="min-h-screen bg-orange-main w-full relative">
            <div className="flex flex-col items-cente w-full">
                {children}
            </div>
        </main>
     );
}
 
export default MarketingLayout;