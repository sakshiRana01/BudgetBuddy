import { ID, Query } from 'appwrite';
import React, { useEffect, useState } from 'react';
import { account, databases } from '../../config';
import { DateConvert } from '../DateConvert';
import '../Styles/UserData.css';
import Chart from '../Chart';
import { useNavigate } from 'react-router';
import { MdWavingHand } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import { ColorRing } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/joy/CircularProgress';
import Joyride from 'react-joyride';
import 'react-circular-progressbar/dist/styles.css';
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const UserData = () => {
    const [userData, setUserData] = useState([]);
    const [iterateData, setIterateData] = useState([]);
    const [lastIndex, setLastIndex] = useState(0);
    const [showNote, setShowNote] = useState({});
    const [activeMoneyExpenses, setActiveMoneyExpenses] = useState(false);
    const [activeNotes, setActiveNotes] = useState(false);
    const [activeAllData, setActiveAllData] = useState(false);
    const [user, setUser] = useState([]);
    const [monthExpenses, setMonthExpenses] = useState(0);
    const [profile, setProfile] = useState('');
    const [addExpenses, setAddExpenses] = useState(false);
    const [isRendered, setIsRendered] = useState(false);
    const [showTour, setTour] = useState(false);
    const [name, setName] = useState('');

    const [data, setData] = useState({
        Date: '',
        Amount: '',
        Note: ''
    });
    const [loader, setLoader] = useState(false);
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthval = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    console.log(`Current Date: ${day}`);
    console.log(`Current Month: ${monthval}`);
    console.log(`Current Year: ${year}`);

    useEffect(() => {
        setLoader(true);
        const fetchAccount = async () => {
            try {
                const result = await account.get();
                setUser(result);
                setLoader(false);
                setName(result.name[0]);
            } catch (error) {
                console.log("No account");
            }
        };

        fetchAccount();
    }, []);

    // Fetch user data from the database
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const response = await databases.listDocuments(
                        '6656a57e002234baa87a',
                        '6656a588002449f41782',
                        [Query.equal('ID', user.$id)]
                    );
                    console.log("Response data ---------", response);
                    setUserData(response.documents);
                    const initialData = response.documents.slice(-7).reverse();
                    setIterateData(initialData);
                    setLastIndex(response.documents.length - 7);
                } catch (error) {
                    console.log("No data", error);
                }
            }
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        if (userData.length > 0) {
            findMonthExpense();
            groupExpensesByDate();
        }
    }, [userData]);

    const findMonthExpense = () => {
        let value = 0;
        const formattedMonthVal = monthval.toString().padStart(2, '0'); // Ensure monthval is a two-digit string
        console.log("formattedMonthVal:", formattedMonthVal);

        for (let i = 0; i < userData.length; i++) {
            console.log("--------------");
            const date = new Date(userData[i].Date); // Convert to Date object
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month and pad it to two digits
            console.log("Processing date:", userData[i].Date);
            console.log("Extracted month:", month);

            if (month === formattedMonthVal) {
                value += userData[i].Money;
                console.log("Matched month:", month);
                console.log("Current value:", value);
            }
        }
        console.log("Final month expenses value:", value);
        setMonthExpenses(value);
    };

    console.log("monthExpenses", monthExpenses);

    const groupExpensesByDate = (data = userData) => {
        const groupedData = data.reduce((acc, expense) => {
            const date = expense.Date.split('T')[0]; // Get the date part only
            if (!acc[date]) {
                acc[date] = {
                    Date: date,
                    Money: 0,
                    Notes: []
                };
            }
            acc[date].Money += expense.Money;
            acc[date].Notes.push(expense.Note);
            return acc;
        }, {});

        const groupedArray = Object.values(groupedData);
        setIterateData(groupedArray.slice(-7).reverse());
    };

    // Handle showing previous data
    const handlePrev = () => {
        if (lastIndex > 0) {
            const newLastIndex = Math.max(lastIndex - 7, 0);
            const newIterateData = iterateData.slice(newLastIndex, lastIndex).reverse();
            setIterateData(newIterateData);
            setLastIndex(newLastIndex);
        }
    };

    console.log("lastIndex", lastIndex);

    const handleNext = () => {
        if (lastIndex <= userData.length) {
            const newLastIndex = Math.min(lastIndex + 7, iterateData.length);
            const newIterateData = iterateData.slice(lastIndex, newLastIndex).reverse();
            setIterateData(newIterateData);
            setLastIndex(newLastIndex);
        }
    };

    // Handle form submission
    const steps = [
        {
            target: ".add",
            content: "Click here to add a new expense along with a note to keep track of your spending.",
            disableBeacon: true
        },
        {
            target: ".chart-div",
            content: "Here you can view a chart of your latest expenses. This helps you visualize your spending patterns.",
        },
        {
            target: ".prev",
            content: "Use this button to navigate and see your previous expenses.",
        },
        {
            target: ".next",
            content: "Use this button to navigate and see your next expenses.",
        },
        {
            target: ".note-container",
            content: "This section displays your expenses along with the notes and dates. Review your spending history here.",
        },
        {
            target: ".month-expenses",
            content: "Check your current month's total expenses here. Stay updated on your monthly spending.",
        },
        {
            target: ".logout",
            content: "Click here to logout from your account securely.",
        }
    ];

    useEffect(() => {
        if (!loader && user && userData.length > 0) {
            setIsRendered(true); // Set this when all elements are rendered
        }
    }, [loader, user, userData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await databases.createDocument(
                '6656a57e002234baa87a',
                '6656a588002449f41782',
                ID.unique(),
                {
                    ID: String(user.$id),
                    Date: data.Date,
                    Money: parseFloat(data.Amount),
                    Note: data.Note
                }
            );
            console.log("Response", response);
            toast.success("Added Successfully");

            setUserData((prevData) => [...prevData, response]);
            const updatedData = [response, ...userData];
            groupExpensesByDate(updatedData);

            setData({
                Date: '',
                Amount: '',
                Note: ''
            });

            findMonthExpense();
        } catch (error) {
            console.log("Error", error);
        }
    };

    const dates = iterateData.map(item => {
        const dateString = item.Date;
        const regex = /^(\d{4})-(\d{2})-(\d{2})/;
        const match = dateString.match(regex);
        if (match) {
            const [_, year, month, day] = match; // Destructure the matched parts
            return `${day}-${month}-${year}`;
        }
        return null; // or handle invalid date format appropriately
    });

    const money = iterateData.map(item => item.Money);
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const result = await account.deleteSession('current');
            if (result) {
                navigate('/login');
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    console.log("userData", userData);

    const handleAdd = () => {
        setAddExpenses(!addExpenses);
        document.getElementById('Main-container').classList.toggle('blur');
    };

    return (
        <>
            {isRendered && (
                <Joyride
                    steps={steps}
                    continuous={true}
                    showProgress={true}
                    showSkipButton={true}
                    styles={{
                        options: {
                            arrowColor: "#fff",
                            backgroundColor: "#fff",
                            beaconSize: 36,
                            overlayColor: "rgba(0, 0, 0, 0.5)",
                            primaryColor: "#7F5AF0",
                            spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
                            textColor: "#333",
                            zIndex: 1000,
                        },
                        spotlight: {
                            backgroundColor: "transparent",
                        },
                    }}
                />
            )}

            {addExpenses && (
                <div className="add-container">
                    <RxCross2 style={{ color: "white", position: "absolute", top: "21px", right: "24px" }} onClick={handleAdd} />
                    <p className="add-title">Add my Expense</p>
                    <form onSubmit={handleSubmit} className='userdata'>
                        <input
                            type='date'
                            value={data.Date}
                            onChange={(e) => setData({ ...data, Date: e.target.value })}
                            className='data-field'
                        />
                        <input
                            type='number'
                            placeholder='0'
                            value={data.Amount}
                            onChange={(e) => setData({ ...data, Amount: e.target.value })}
                            className='data-field'
                        />
                        <input
                            type='text'
                            placeholder='Add your text'
                            value={data.Note}
                            onChange={(e) => setData({ ...data, Note: e.target.value })}
                            className='data-field'
                        />
                        <button type="submit" className='submit'>Add</button>
                    </form>
                </div>
            )}

            {loader ? (
                <div className='loader'>
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
            ) : (
                <div className='Main-container' id="Main-container">
                    <div className="left-container">
                        <img src="/dashboardleft.png" style={{ width: "100%" }} alt="Dashboard Left" />
                        <p className='add' onClick={handleAdd}>
                            <IoAdd style={{ textAlign: "center", marginRight: "20px" }} />Add my Expenses
                        </p>
                        <div className="month-expenses">
                            <p className='month-label'>Month Expenses:</p>
                            <div style={{ padding: "20px 40px 40px 40px" }}>
                                <CircularProgressbar
                                    value={monthExpenses}
                                    text={`Rs ${monthExpenses}`}
                                    styles={buildStyles({
                                        strokeLinecap: "butt",
                                        textSize: "14px",
                                        textColor: "white",
                                        pathColor: "#7F5AF0",
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='middle-container'>
                        <h1 className='welcome'>
                            Welcome<span style={{ margin: "0 10px" }}>{user.name}</span>
                            <MdWavingHand style={{ color: "#F3BC1C" }} />
                        </h1>
                        <button className='showbtn' onClick={handlePrev}>Show Previous</button>
                        <button className='showbtn next' onClick={handleNext}>Show Next</button>
                        <div className='chart-div'>
                            <Chart date={dates} money={money} />
                        </div>
                        <div className='note-container'>
                            {iterateData.map((item) => (
                                <div key={item.Date} className='note-div'>
                                    <DateConvert timestamp={item.Date} />
                                    <p className='note'>Rs {item.Money}</p>
                                    <p className='note'>Notes: {item.Notes ? item.Notes.join(", ") : ''}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='right-container'>
                        <h2 className='title'>Profile</h2>
                        <p className='profile'>{name}</p>
                        <p className='name'>{user.name}</p>
                        <div className='profile-bottom'>
                            <p className='email'>{user.email}</p>
                            <p className='email'>Created At: <span><DateConvert timestamp={user.$createdAt} /></span></p>
                        </div>
                        <div className="logout-div">
                            <MdLogout style={{ color: "#898989" }} />
                            <button onClick={handleLogout} className='logout'>Logout</button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    );
};
