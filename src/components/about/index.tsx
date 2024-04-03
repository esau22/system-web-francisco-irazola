import Container from "@/components/shared/container";
import SubTitle from "@/components/ui/sub-title";
import SectionImages from "@/components/about/sections/sections-images";
import SectionList from "@/components/about/sections/section-list";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center"
    >
      <Container>
        <SubTitle title="Why Join With" titlePrimary="Us?" />
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <SectionList />
          <SectionImages />
        </div>
      </Container>
    </section>
  );
};

export default About;
