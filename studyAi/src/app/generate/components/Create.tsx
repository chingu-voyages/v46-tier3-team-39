export default function Create() {
    return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <form action="#" method="POST">
            <div className="mb-4">
                <label className="block text-gray-600 font-medium">Name</label>
                <textarea id="message" name="message" class="w-full px-3 border rounded-md focus:outline-none focus:border-blue-500" rows="1" placeholder="Your message here" required></textarea>

                {/* <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="John Doe" required> */}
            </div>

            <div className="mb-4">
                <label className="block text-gray-600 font-medium">Email</label>
                <textarea id="message" name="message" class="w-full px-3 border rounded-md focus:outline-none focus:border-blue-500" rows="1" placeholder="Your message here" required></textarea>
                {/* <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="johndoe@example.com" required> */}
            </div>
            <div className="mb-6">
                <label className="block text-gray-600 font-medium">Message</label>
                <textarea id="message" name="message" class="w-full px-3 border rounded-md focus:outline-none focus:border-blue-500" rows="1" placeholder="Your message here" required></textarea>
            </div>
            <div className="mb-4">
                <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700">
                    Submit
                </button>
            </div>
        </form>
    </div>
    )
}