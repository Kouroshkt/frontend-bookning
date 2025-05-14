import styled from "styled-components";

export function About() {
  return (
    <AboutSection>
      <ContentWrapper>
        <ImageWrapper>
          <StyledImg src="20.jpg" alt="Bil" />
          <StyledImg src="30.jpg" alt="Bil" />
        </ImageWrapper>
        <TextWrapper>
          <h2>OM OSS</h2>
          <p>
            Kourosh Car Rental AB ingår i Hedin Group och är ett av Sveriges största enskilda biluthyrningsföretag.
            Sedan starten i Stockholm 1989 har vi vuxit konstant och idag bedriver vi biluthyrning på fler än 10 platser
            över hela landet. Vårt syfte är att förse marknaden med hyrbilar till konkurrenskraftiga priser utan att
            tumma på kvalitet, säkerhet, service eller tillgänglighet.
          </p>
          <h2>Våra affärsområden</h2>
          <p>
            Kourosh Car Rental Hyrbilar – biluthyrning, Kourosh Car Rental Mobility utvecklar nya lösningar för
            bilanvändning i en föränderlig värld, exempelvis bilpooler, Kourosh Car Rental Truck Rental erbjuder tunga
            lastbilar och Flexilease som är ett separat varumärke för flexibel leasing till företag.
            <br /><br />
            Vi fyller en funktion genom att vara ett behovsstyrt komplement till tjänstebilar med långa leasingavtal.
            Hyrbil är ett flexibelt sätt att tillgodose transportbehov, oavsett om det gäller endagshyror eller längre
            perioder. Vi erbjuder även skräddarsydda lösningar som egna bokningsportaler och leveranser till era
            företagsadresser.
          </p>
        </TextWrapper>
      </ContentWrapper>
    </AboutSection>
  );
}

// STYLING

const AboutSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  gap: 2rem;
  align-items: center;
`;

const ImageWrapper = styled.div`
  flex: 1 1 400px;
`;

const StyledImg = styled.img`
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  object-fit: cover;
`;

const TextWrapper = styled.div`
  flex: 1 1 500px;
  color: #333;

  h2 {
    margin-top: 0;
    color: #1a2e45;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;
