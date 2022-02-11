import SectionContainer from "@/components/SectionContainer";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";

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
