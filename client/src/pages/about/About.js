import React from 'react';
import "./about.css"

const About = () => {

    return (
			<>
				<div className='header'>
					<div className='headerTitles'>
						<span className='headerTitleSm'>React & Node</span>
						<span className='headerTitleLg'>Blog</span>
					</div>
				</div>
				<div className='about'>
					<p>
						The Conte Center @ UCI addresses the complex developmental mechanisms contributing to
						resilience or vulnerabilities to mental illnesses throughout life. It focuses on probing
						the impact of early life experiences including early life adversity to the maturation of
						emotional and cognitive brain circuits, addressing the underlying processes at
						molecular, cellular, circuit and computational/modeling levels of analysis. We are
						striving to understand how the constantly evolving environment that infants and young
						children experience in our modern and chaotic world influences the structural and
						functional maturation of the brain. These changes, in turn, may increase the
						vulnerability of children, adolescents, and adults to several mental illnesses. We
						investigate if chaos and unpredictability of parental and environmental signals to the
						developing brain impact its normal maturation processes. To enable discoveries and
						enhance their impact, UC Irvine’s Conte Center includes multidisciplinary teams studying
						cohorts of individuals from fetal life to adulthood, including military veterans. We
						employ cutting edge tools in experimental models, including epigenomics,
						viral-transgenic mapping and manipulation as well as in vivo imaging across species.
						These are integrated via our neuroimaging and computational cores. The Center's mission
						is to enhance and share its discoveries by serving as a focus of research and a magnet
						for trainees through its monthly gatherings, seminar series, symposia and outreach
						activities.
					</p>
				</div>
			</>
		);
};

export default About;