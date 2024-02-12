type props = {
    props: string;
    setProps: any;
    name: string;
    type?: string | "text";
};

export const FormInputComponent = ({ props, setProps, name, type }: props) => {
    return (
        <section className="relative">
            <input
                id={name}
                type={type}
                value={props}
                onChange={(e: any) => setProps(e.target.value)}
                className="w-full outline-none mt-1 px-2 py-3 bg-secondary border  peer focus:bg-primary text-light rounded-sm placeholder:text-light/75 transition "
            />
            <label
                className={`font-semibold absolute  left-2 top-1 translate-y-1/2 ${
                    props === "" ? "text-white/50" : "text-white/0"
                } cursor-pointer peer-focus:-translate-y-3 peer-focus:-translate-x-1 inline peer-focus:bg-white peer-focus:text-primary rounded-sm transition px-1`}
                htmlFor={name}
            >
                {name}
            </label>
        </section>
    );
};
