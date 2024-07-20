export const CenterContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-svh flex justify-center items-center">
            {children}
        </div>
    )
}