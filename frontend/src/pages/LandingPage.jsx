import Header from "../components/Header";
import Hero from "../components/Hero";
import BookList from "../components/BookList";

export default function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <section className="min-h-screen bg-gray-50">
        <BookList query="the little prince" />
      </section>
    </>
  );
}
