export default function Create() {
    return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <form action="#" method="POST">
            <div className="mb-4">
                <label for="name" class="block text-gray-600 font-medium">Name</label>
                {/* <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="John Doe" required> */}
            </div>

            <div className="mb-4">
                <label for="email" class="block text-gray-600 font-medium">Email</label>
                {/* <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="johndoe@example.com" required> */}
            </div>

            <div className="mb-6">
                <label for="message" className="block text-gray-600 font-medium">Message</label>
                <textarea id="message" name="message" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" rows="4" placeholder="Your message here" required></textarea>
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