import SectionContainer from "@/components/section-container";
import Header from "@/components/header/header";
import Footer from "@/components/footer";

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="static flex flex-col justify-between w-full h-screen">
        <Header />
        <main className="flex content-center justify-center w-full h-auto m-0 mb-auto">
          {children}
        </main>
        <Footer />
      </div>
    </SectionContainer>
  );
};

export default LayoutWrapper;
