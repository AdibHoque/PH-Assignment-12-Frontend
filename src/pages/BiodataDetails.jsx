import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import {useContext, useEffect} from "react";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {PiCrownSimpleFill} from "react-icons/pi";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import MySwal from "sweetalert2";
import {AuthContext} from "../AuthProvider";
import {useState} from "react";

export default function BiodataDetails() {
  const {user} = useContext(AuthContext);
  const data = useLoaderData();
  const [isPremium, setIsPremium] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://truebond-matrimony.vercel.app/biodatas?email=${user.email}`)
      .then((data) => data.json())
      .then((data) => setIsPremium(data.premium));
  }, [user]);

  const {
    _id,
    biodataId,
    gender,
    name,
    profileImage,
    dob,
    height,
    weight,
    age,
    occupation,
    race,
    fathersName,
    mothersName,
    permanentDivision,
    presentDivision,
    expectedPartnerAge,
    expectedPartnerHeight,
    expectedPartnerWeight,
    contactEmail,
    mobileNumber,
    premium,
  } = data;

  function addToFavorite() {
    const db = localStorage.getItem(`favorite-${user.email}`);
    const favDb = db ? JSON.parse(db) : [];
    const itemExists = favDb.some((favItem) => favItem._id === data._id);

    if (itemExists) {
      MySwal.fire({
        position: "center",
        icon: "error",
        text: "You already favorited this Biodata.",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      favDb.push(data);
      localStorage.setItem(`favorite-${user.email}`, JSON.stringify(favDb));
      MySwal.fire({
        position: "center",
        icon: "success",
        text: "Successfully favorited this Biodata.",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }

  const handleContactReq = () => {
    MySwal.fire({
      title: "Request Information?",
      text: "An Admin will soon review your request after your request.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Request",
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          requesterEmail: user.email,
          biodataId: data.biodataId,
          name: data.name,
          contactEmail: data.contactEmail,
          mobileNumber: data.mobileNumber,
          status: "pending",
        };
        fetch("https://truebond-matrimony.vercel.app/contactrequests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });

        MySwal.fire({
          title: "Request Successful!",
          text: `Wait for an admin to review your request.`,
          icon: "success",
        });
        navigate("/dashboard/mycontactrequest");
      } else return;
    });
  };

  return (
    <Card className="flex-col items-center justify-center w-full min-h-screen py-4 md:px-4 lg:flex-row lg:px-24">
      <CardHeader
        shadow={false}
        floated={false}
        className="px-4 m-0 mx-auto rounded-r-none lg:w-1/2 lg:h-full"
      >
        <img
          src={profileImage}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between">
          <Typography variant="h3" color="purple">
            {name}
          </Typography>
          {premium ? (
            <Button
              variant="gradient"
              color="purple"
              size="sm"
              className="flex items-center gap-3"
            >
              <PiCrownSimpleFill />
              PREMIUM
            </Button>
          ) : (
            ""
          )}
        </div>
        <Typography variant="lead" color="gray" className="text-xs font-normal">
          Biodata ID-{biodataId}
        </Typography>
        <Typography variant="h5" color="purple" className="mt-4">
          Complete Biodata
        </Typography>
        <div className="flex items-center justify-between">
          <Typography
            variant="lead"
            color={gender == "Male" ? "blue" : "pink"}
            className="mt-3 font-normal"
          >
            <span className="font-medium text-blue-gray-900">Gender: </span>
            {gender}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            <span className="font-medium text-blue-gray-900">Age: </span>
            {`${age} (${dob})`}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <Typography variant="lead" className="mt-3 font-normal">
            <span className="font-medium text-blue-gray-900">Height: </span>
            {height}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            <span className="font-medium text-blue-gray-900">Weight: </span>
            {weight}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <Typography variant="lead" className="mt-3 font-normal">
            <span className="font-medium text-blue-gray-900">Occupation: </span>
            {occupation}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            <span className="font-medium text-blue-gray-900">Race: </span>
            {race}{" "}
          </Typography>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-2">
          <Typography variant="lead" className="mt-3 font-normal">
            <span className="font-medium text-blue-gray-900">
              Fathers Name:{" "}
            </span>
            {fathersName}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            <span className="font-medium text-blue-gray-900">
              Mothers Name:{" "}
            </span>
            {mothersName}
          </Typography>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-2">
          <Typography variant="lead" className="mt-3 font-normal">
            <span className="font-medium text-blue-gray-900">
              Permanent Division:{" "}
            </span>
            {permanentDivision}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            <span className="font-medium text-blue-gray-900">
              Present Division:{" "}
            </span>
            {presentDivision}
          </Typography>
        </div>
        <Typography variant="h5" color="purple" className="mt-6">
          Expectations from Partner
        </Typography>
        <div className="flex items-center justify-between">
          <Typography variant="lead" className="mt-3 font-normal">
            <span className="font-medium text-blue-gray-900">Age: </span>
            {expectedPartnerAge}
          </Typography>
          <Typography variant="lead" className="mt-3 font-normal">
            <span className="font-medium text-blue-gray-900">Height: </span>
            {expectedPartnerHeight}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            <span className="font-medium text-blue-gray-900">Weight: </span>
            {expectedPartnerWeight}
          </Typography>
        </div>
        {isPremium ? (
          <div>
            <Typography variant="h5" color="purple" className="mt-6">
              Contact Information
            </Typography>
            <div className="flex flex-wrap items-center justify-between gap-x-2">
              <Typography variant="lead" className="mt-3 font-normal">
                <span className="font-medium text-blue-gray-900">
                  Mobile Number:{" "}
                </span>
                {mobileNumber}
              </Typography>
              <Typography
                variant="lead"
                color="gray"
                className="mt-3 font-normal"
              >
                <span className="font-medium text-blue-gray-900">Email: </span>
                {contactEmail}
              </Typography>
            </div>
          </div>
        ) : (
          <a onClick={handleContactReq} className="inline-block mt-4 mr-2">
            <Button
              variant="outlined"
              color="purple"
              className="flex items-center gap-2"
            >
              Request Contact Information
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        )}
        <a className="inline-block mt-4">
          <Button
            variant="outlined"
            color="purple"
            className="flex items-center gap-2"
            onClick={addToFavorite}
          >
            Add To Favorites
            <FaRegHeart></FaRegHeart>
          </Button>
        </a>
      </CardBody>
    </Card>
  );
}
