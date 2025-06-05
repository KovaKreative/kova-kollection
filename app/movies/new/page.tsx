
import MovieForm from "@/components/MovieForm";
import { subtitle } from "@/components/primitives";


export default async function AddMovie() {
  return (
    <section className={subtitle()}>
      <h2>
        Add Movie
      </h2>
      <MovieForm />
    </section>
  );
}
