import React from 'react';
import img from '../../../assets/smiling-children-playing-musical-instruments-classroom-school-children-playing-musical-instruments-classroom-142590643.jpg'

const Banner = () => {
    return (
        <div className="hero bg-base-200">
            <div className="hero-content grid lg:grid-cols-2 gap-6 px-6 py-20">
                <img className='rounded shadow-lg' src={img} alt=""/>
                <div>
                    <h1 className="text-5xl font-bold">Find Your Dream Instrument</h1>
                    <p className="py-6">Join the millions of music lovers who use MusicSpot to find everything they need to make music.</p>
                    <button className="btn rounded-none btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;