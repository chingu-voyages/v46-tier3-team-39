import FormatTimeDropdown from "./leftContent/timeFormat"

type VariantName = "base" | "time"

const Input = ({label, id, placeholder, variant = "base"}:{label:string, id: string, placeholder: string, variant?: VariantName}) => {
    const variants = {
        base: {
            layout: "",
            label: "block mb-2 text-5xl font-semibold",
            input: "bg-gray-50 border border-light-on-secondary-container text-Black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        },
        time: {
            layout: "flex absolute top-0 right-0",
            label: "block mb-2 text-5xl font-semibold mx-4",
            input: "bg-gray-50 border border-light-on-secondary-container text-Black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8 h-[30px] my-auto p-1"
        }
    }
    
    return (
        <div className={variants[variant]["layout"]}>
            <label htmlFor="first_name" className={variants[variant]["label"]}>{label}</label>
            <input type="text" id={id} className={variants[variant]["input"]} placeholder={placeholder} />
            {variant == "time" ? <FormatTimeDropdown / >: null}
        </div>
    )
}

export default Input;