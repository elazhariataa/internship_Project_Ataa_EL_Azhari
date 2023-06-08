import './home.css';
import { TextField, Button, Typography, Avatar } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';




function Home(){
    const animationProps = useSpring({
      from: { opacity: 0, transform: 'translateY(100px)' },
      to: { opacity: 1, transform: 'translateY(0px)' },
      config: { duration: 1000 },
    });
    const [ref, inView] = useInView({
      triggerOnce: true,
      rootMargin: '-100px 0px',
    });
    const animationProps2 = useSpring({
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0px)' : 'translateY(50px)',
      config: { duration: 1000 },
    });

    const [testimonials,setTestimonials] = useState([]);
    const [trainees, setTrainees] = useState([]);

    useEffect(()=>{
      const getData = async()=>{
        const res = await axios.get("http://localhost:5002/testimolial/all");
        return res.data;
      }
      getData()
      .then((result)=>{
        setTestimonials(result)
      })
      .catch((error)=>{
        console.log("no data",error.response)
      })
    },[])

    useEffect(() => {
      const getData = async () => {
        const res = await axios.get('http://localhost:5000/trainee/all');
        return res.data;
      };
      getData()
        .then((trainees) => {
          setTrainees(trainees);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }, []);

    return(
        <div className='homeContent'>
            <animated.div className='homeArticle1'>
                <animated.div className='intro' style={animationProps}>
                    <h1>Unlock Your Fitness Potential
                    <br/> 
                    Empower Your Body and Mind
                    </h1>
                    <p>Don't wait any longer to start your fitness journey. Sign up for a membership plan today and join our community of fitness enthusiasts. 
                        <br/>
                        We can't wait to help you reach your goals!
                    </p>
                </animated.div>
                <Button variant="contained" disableElevation
                  
                >
                  <Link to='/register'>
                    Join us
                  </Link>
                  
                </Button>
            </animated.div>
            <div className='homeArticle2' ref={ref}>
                <animated.h2 style={animationProps2}>Welcome to our Gym!</animated.h2>
                <animated.p style={animationProps2}>At our gym, we strive to create a welcoming and inclusive environment for people of all fitness levels. <br />
                    Whether you're a seasoned athlete or just starting out, our team of experienced trainers is here to help you reach your goals.
                </animated.p>
            </div>
            <div className='homeArticle3' id="services">
              <div className='part1'>
                <h2 >OUR SERVICES</h2>
              </div>
              <div className='part2'>
                <div className='service'
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        // height="140"
                        sx={{ height: 200, width: '100%' }}
                        image={require('../images/2.jpg')}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Mind-Body Studio
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Step into our serene and tranquil mind-body studio, designed for activities that promote mental and emotional well-being. 
                        This room is dedicated to activities such as yoga, meditation, and mindfulness practices With calming decor, soft lighting, and a peaceful ambiance.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
                <div className='service'>
                  <Card sx={{ maxWidth: 345,minHeight:"300px"}}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        // height="140"
                        sx={{ height: 200, width: '100%' }}
                        image={require('../images/3.jpg')}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Personal Training
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Our gym offers personalized training sessions tailored to your specific goals and fitness level.
                          Our certified personal trainers will create a customized workout plan, provide guidance on proper form and technique,and motivate you to achieve your desired results. 
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
                <div className='service'>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        // height="140"
                        sx={{ height: 200, width: '100%' }}
                        image={require('../images/4.jpg')}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Group Fitness Classes
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Join our energetic and fun-filled group fitness classes designed to keep you motivated and engaged on your fitness journey.
                          Led by experienced instructors, these classes provide a supportive and social atmosphere where you can challenge yourself,
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              </div>
            </div>
            <div className='homeArticle4'>
              <div>
                <h2>A community of support</h2>
                <p>At our gym, we believe that fitness is about more than just working out – it's about building a community of support and encouragement. Our members come from all walks of life, but we share a common goal: to be our best selves and help each other along the way.</p>
              </div>
            </div>
            <div className='homeArticle5'>
              <h2>WHAT THEY SAID</h2>
              <div className='cards' id="whatTheySaid">
                {testimonials && testimonials.map((item,index)=>{
                  const user = trainees.find((u)=> u.id === item.testimolialCreator)
                  return(
                    <div className="card">
                      <img src={require('../images/quote.png')} alt="" className='quote'/>
                      <p className='speech'>{item.content}</p>
                      <div className="whoIsHe">
                        {/* <img src={user?.image} alt="" /> */}
                        <Avatar
                          src={user?.image}
                          sx={{
                            height: 80,
                            mb: 2,
                            width: 80,
                          }}
                        />
                        <div className="whoIsHe2">
                          <h3>{user?.userName}</h3>
                          <p>{user?.role}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
                
              </div>
            </div>
        </div>
    )
}

export default Home;