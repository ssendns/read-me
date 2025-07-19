import Header from "../components/Header";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12 text-text font-typewriter">
        <img
          src="/anya.jpg"
          alt="Anya"
          className="max-w-md w-full h-auto object-cover mx-auto mb-10"
        />
        <h1 className="text-2xl font-bold text-center mb-6">
          hiii i am anya and this is my website
        </h1>

        <p className="mb-4">
          the one thing i like the most in this life is{" "}
          <span className="italic">reading</span>. i read a lot, i read everyday
          and my notes are filled with my thoughts about books i read.
        </p>

        <p className="mb-4">
          i tried to organize them using premade book diary templates, but i
          could never find one that really worked for me. — some features were
          always missing or in contrast there was so much irrelevant stuff.
        </p>

        <p>
          soooo i decided to make my own{" "}
          <span className="font-semibold">book tracker</span> for all book
          lovers like me. create your own library, browse new books and enjoy{" "}
          <span className="font-bold">read-me</span> 📚
        </p>
      </main>
    </>
  );
}
