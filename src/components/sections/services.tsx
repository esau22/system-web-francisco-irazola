import SubTitle from "@/components/ui/sub-title";
import Container from "@/components/shared/container";
import Service from "@/components/ui/service";

const Services = () => {
  return (
    <section
      id="services"
      className="min-h-screen flex items-center justify-center mb-10 lg:mb-0"
    >
      <Container>
        <SubTitle title="Fitness Plans &" titlePrimary="Educación integral" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
          <Service
            image="/images/cards/cards-02.png"
            title="Tecnologia"
            description="En I.E. Francisco Irazola, la tecnología transforma el aprendizaje con aulas digitales, robótica y programación."
          />
          <Service
            image="/images/cards/cards-01.png"
            title="Cultura"
            description="En I.E. Francisco Irazola, fomentamos una rica vida cultural con programas de arte, música, teatro y literatura."
          />
          <Service
            image="/images/cards/cards-03.png"
            title="Deporte"
            description="En I.E. Francisco Irazola, promovemos la excelencia deportiva con diversas disciplinas y modernas instalaciones."
          />
          <Service
            image="/images/cards/cards-04.png"
            title="Formacion Religiosa"
            description="En I.E. Francisco Irazola, fortalecemos valores y espiritualidad a través de una sólida formación religiosa."
          />
          <Service
            image="/images/cards/cards-05.png"
            title="Electronica"
            description="En I.E. Francisco Irazola, la electrónica es más que un curso, es una ventana hacia la innovación, donde los estudiantes desarrollan habilidades técnicas y creatividad para diseñar el futuro."
          />
          <Service
            image="/images/cards/cards-06.png"
            title="Costura"
            description="En I.E. Francisco Irazola, la costura es un arte ancestral que cultivamos para inspirar la creatividad y la habilidad manual de nuestros estudiantes, fusionando tradición con expresión personal."
          />
        </div>
      </Container>
    </section>
  );
};

export default Services;
