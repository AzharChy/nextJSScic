export default function Faq(){
    return(
       
           <section className="bg-base-200">
  <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
    <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">
      Frequently Asked Questions
    </h2>
    <div className="divide-y dark:divide-gray-300">
      <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
        <h3 className="font-semibold md:col-span-5">
          How do I create an account?
        </h3>
        <p className="md:pl-0 md:col-span-7">
          You can create an account by visiting the{" "}
          <strong>Register</strong> page and filling out your name, email, and
          password. Once registered, you’ll be logged in automatically.
        </p>
      </div>

      <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
        <h3 className="font-semibold md:col-span-5">
          Can I log in using Google?
        </h3>
        <p className="md:pl-0 md:col-span-7">
          Yes! We support Google login. Simply go to the{" "}
          <strong>Sign In</strong> page and click the Sign in with Google
          button for quick access.
        </p>
      </div>

      <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
        <h3 className="font-semibold md:col-span-5">
          How can I add a new product?
        </h3>
        <p className="md:pl-0 md:col-span-7">
          Only authenticated users can add products. Once logged in, navigate to{" "}
          <strong>Dashboard &gt; Add Product</strong>, fill out the product
          form, and click submit. Your product will be saved to the database.
        </p>
      </div>

      <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
        <h3 className="font-semibold md:col-span-5">
          Why can’t I access the dashboard?
        </h3>
        <p className="md:pl-0 md:col-span-7">
          The dashboard is protected and requires you to be logged in. If you
          aren’t authenticated, you’ll be redirected to the{" "}
          <strong>Sign In</strong> page.
        </p>
      </div>

      <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
        <h3 className="font-semibold md:col-span-5">
          Are my account details secure?
        </h3>
        <p className="md:pl-0 md:col-span-7">
          Yes. Your password is encrypted using industry-standard hashing
          (bcrypt). We never store plain text passwords.
        </p>
      </div>

      <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
        <h3 className="font-semibold md:col-span-5">
          How do I view product details?
        </h3>
        <p className="md:pl-0 md:col-span-7">
          On the homepage, you’ll see product highlights. Click on{" "}
          <strong>Buy Now</strong> or the product title to view full details of
          a product before purchasing.
        </p>
      </div>
    </div>
  </div>
</section>

        
    )
}