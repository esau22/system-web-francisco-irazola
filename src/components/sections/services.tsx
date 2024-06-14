import SubTitle from "@/components/ui/sub-title";
import Container from "@/components/shared/container";
import Service from "@/components/ui/service";

const Services = () => {
  return (
    <section
      id="services"
      className="min-h-screen flex items-center justify-center mb-10 lg:mb-0 py-8"
    >
      <Container>
        <SubTitle title="Fitness Plans &" titlePrimary="Educación integral" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
          <Service
            image="/images/cards/tecnologico.jpg"
            title="Tecnologia"
            description="En I.E. Francisco Irazola, la tecnología transforma el aprendizaje con aulas digitales, robótica y programación."
          />
          <Service
            image="/images/cards/industria.jpg"
            title="Industria Alimentaria"
            description="En I.E. Francisco Irazola, fomentamos la industria alimentaria, tiene talleres donde realizan reposteria,o cyalquier tipo de preparación de alimentos.."
          />
          <Service
            image="/images/cards/deporte.jpg"
            title="Deporte"
            description="En I.E. Francisco Irazola, promovemos la excelencia deportiva con diversas disciplinas y modernas instalaciones."
          />
          <Service
            image="/images/cards/mecanica.jpg"
            title="Mecánica"
            description="En I.E. Francisco Irazola, tiene talleres de mecanica para todos los alunoms asi impulsandoles a los estudiantes a aprender nuevas cosas."
          />
          <Service
            image="/images/cards/cards-05.png"
            title="Electronica"
            description="En I.E. Francisco Irazola, la electrónica es más que un curso, es una ventana hacia la innovación, donde los estudiantes desarrollan habilidades técnicas y creatividad para diseñar el futuro."
          />
          <Service
            image="/images/cards/costura.jpg"
            title="Costura"
            description="En I.E. Francisco Irazola, la costura es un arte ancestral que cultivamos para inspirar la creatividad y la habilidad manual de nuestros estudiantes, fusionando tradición con expresión personal."
          />
        </div>
      </Container>
    </section>
  );
};

export default Services;
