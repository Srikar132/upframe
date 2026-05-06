import { forwardRef } from "react";

type Props = {
    className?: string;
};

const Menu = forwardRef<HTMLDivElement, Props>(({ className = "" }, ref) => {


    return (
        <section
            ref={ref}
            className={`w-full h-screen bg-red-500 fixed inset-0 z-20 ${className}`}
        >
            
        </section>
    );
});

Menu.displayName = "Menu";

export default Menu;