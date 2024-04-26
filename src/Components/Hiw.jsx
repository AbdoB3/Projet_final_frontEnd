
import { Link } from 'react-router-dom';

const workprocess = [
	{
			"id": 1,
			"icon": "flaticon-pharmacy",
			"title": "Search Best Online <br> Professional",
			"text": "It is a long established fact that a reader will be distracted by the readable."
	},
	{
			"id": 2,
			"icon": "flaticon-event",
			"title": "Get Instant <br> Appointment",
			"text": "It is a long established fact that a reader will be distracted by the readable."
	},
	{
			"id": 3,
			"icon": "flaticon-doctor",
			"title": "Leave Your <br> Feedback",
			"text": "It is a long established fact that a reader will be distracted by the readable."
	}
];

const Workprocess = () => {
    return (
        <div className="section">
            <div className="container">
                <div className="row align-items-center mb-5">
                    <div className="col-lg-5">
                        <div className="section-title">
                            <span className="subtitle">Work Process</span>
                            <h3 className="title mb-0">How it Works?</h3>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <p className="mb-0">Donec rutrum congue leo eget malesuada. Nulla porttitor accumsan tincidunt. Vestibulum
                            ante ipsum primis.</p>
                    </div>
                    <div className="col-lg-3 text-lg-right">
                        <Link to="/appointment" className="sigma_btn mt-4 mt-lg-0">Make Appointment</Link>
                    </div>
                </div>
                <div className="row sigma_info-wrapper style-25">
                    {/* Data */}
                    {workprocess.map((item, i) => (
                        <div className="col-lg-4 col-md-6" key={i}>
                            <div className="sigma_info style-25 d-block d-xl-flex">
                                <div className="sigma_info-title">
                                    <span className="sigma_info-icon">
                                        <i className={item.icon} />
                                    </span>
                                </div>
                                <div className="sigma_info-description mt-4 mt-xl-0">
                                    <h5 dangerouslySetInnerHTML={{ __html: item.title }} />
                                    <p>{item.text}</p>
                                    <span className="steps">Step {1 + i}</span>
                                    <span className="pulsive-dot" />
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Data */}
                </div>
            </div>
        </div>
    );
}

export default Workprocess;
