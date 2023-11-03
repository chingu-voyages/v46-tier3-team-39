import Input from "../input"

const LeftContent = () => {

    return (
        <div className="mr-8 w-[500px] relative">
            <form>
                <Input label="Est. Time" id="time" placeholder="" variant="time"/>
                <Input label="Question Title" id="title" placeholder=""/>
                <Input label="Tags" id="tags" placeholder=""/>
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-5xl font-semibold text-Black">Question Description</label>
                    <textarea id="description" className="bg-gray-50 border border-light-on-secondary-container text-Black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[215px] max-h-[215px]" placeholder="" />
                </div>
            </form>
        </div>
    )
}

export default LeftContent