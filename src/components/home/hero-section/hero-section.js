/* eslint-disable react/no-unescaped-entities */
import { Container } from 'react-bootstrap';

const HeroSection = () => {
    return (
        <main>
            <Container fluid className="px-0 relative pb-5">
                <div className="relative">
                    <div
                        className="w-full h-[853px] relative bg-cover bg-center"
                        style={{
                            backgroundImage: `url(/assets/landingimage.png)`,
                        }}
                    >
                        <div className="bg-overlay2"></div>
                        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center text-white px-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-5xl leading-tight mb-6">
                                Bid With Confidence, Win With Security & Experience The Future Of Auctions
                            </h1>

                            <p className="text-lg md:text-xl mb-8 max-w-2xl">
                                "Join a trusted marketplace where every bid is protected and every transaction is seamless."
                            </p>

                            <button className="bg-white text-black px-12 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors">
                                Bid Now
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
};

export default HeroSection;