import Button from "@/components/ui/button";

const SectionList = () => {
  return (
    <section className="flex-1 flex flex-col items-center gap-8">
      <ul className="space-y-4 text-xl">
        <li className="relative before:absolute before:w-2 before:h-2 before:bg-primary before:rounded-full before:top-1/2 before:-translate-y-1/2 before:-left-4">
          Buena Infraestructura del plantel academico
        </li>
        <li className="relative before:absolute before:w-2 before:h-2 before:bg-primary before:rounded-full before:top-1/2 before:-translate-y-1/2 before:-left-4">
          Docentes con experiencia laboral.
        </li>
        <li className="relative before:absolute before:w-2 before:h-2 before:bg-primary before:rounded-full before:top-1/2 before:-translate-y-1/2 before:-left-4">
          Flexible Workout Time
        </li>
        <li className="relative before:absolute before:w-2 before:h-2 before:bg-primary before:rounded-full before:top-1/2 before:-translate-y-1/2 before:-left-4">
          Good Workout Facilities
        </li>
        <li className="relative before:absolute before:w-2 before:h-2 before:bg-primary before:rounded-full before:top-1/2 before:-translate-y-1/2 before:-left-4">
          Consultation With Experts
        </li>
      </ul>
      <Button type="button" label="Ver mas Beneficios" />
    </section>
  );
};

export default SectionList;
