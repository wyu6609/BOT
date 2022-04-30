import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./Market.css";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReactPaginate from "react-paginate";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

import CategoryMenu from "../components/CategoryMenu";
import { useHistory } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: ["Press Start 2P", "cursive"].join(","),
  },
});

function Market({ bot, setBot }) {
  const history = useHistory();
  const options = [
    "All",
    "Pre-Programmed",
    "Humanoid",
    "Autonomous",
    "Teleoperated",
    "Augmenting",
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [botList, setBotList] = useState([]);

  useEffect(() => {
    fetch("/products")
      .then((r) => r.json())
      .then((products) => {
        console.log(products);
        setBotList(products);
      });
  }, []);

  const [pageNumber, setPageNumber] = useState(0);
  const botsPerPage = 9;
  const pagesVisited = pageNumber * botsPerPage;

  const [filteredBotList, setFilteredBotList] = useState(botList);
  useEffect(() => {
    filterHandler();
  }, [botList, selectedIndex]);
  const filterHandler = () => {
    switch (selectedIndex) {
      case 1:
        setFilteredBotList(
          botList.filter((bot) => bot.category.name === "Pre-Programmed")
        );
        break;
      case 2:
        setFilteredBotList(
          botList.filter((bot) => bot.category.name === "Humanoid")
        );
        break;
      case 3:
        setFilteredBotList(
          botList.filter((bot) => bot.category.name === "Autonomous")
        );
        break;
      case 4:
        setFilteredBotList(
          botList.filter((bot) => bot.category.name === "Teleoperated")
        );
        break;
      case 5:
        setFilteredBotList(
          botList.filter((bot) => bot.category.name === "Augmenting")
        );
        break;
      default:
        setFilteredBotList(botList);
        break;
    }
  };

  const displayBots = filteredBotList.slice(
    pagesVisited,
    pagesVisited + botsPerPage
  );

  const pageCount = Math.ceil(filteredBotList.length / botsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const clickCardHandler = (bot) => {
    setBot(bot);
    history.push("/bot");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        {/* Hero unit */}

        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="
              #3794ff"
              gutterBottom
            >
              bot_market
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Why do it yourself when you can do it with a bot?
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 5 }} maxWidth="md">
          {/* End hero unit */}

          <div className="bot-grid">
            <CategoryMenu
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              options={options}
            />
          </div>
          <Grid container spacing={4}>
            {displayBots.map((bot) => (
              <Grid item key={bot} xs={12} sm={6} md={4}>
                <Card
                  onClick={() => {
                    clickCardHandler(bot);
                  }}
                  className="fancy_card"
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "5%",
                    }}
                    image={bot.image}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {bot.title}
                    </Typography>
                    <Typography component="h3">{bot.description}</Typography>
                  </CardContent>
                  <Typography
                    sx={{ color: "#fd5d77" }}
                    size="small"
                    component="p"
                    align="center"
                  >
                    {bot.category.name}
                  </Typography>
                  <CardActions>
                    <IconButton size="small" sx={{ color: "#3794ff" }}>
                      <AddShoppingCartRoundedIcon />
                    </IconButton>

                    <Typography
                      sx={{
                        mx: "auto",
                      }}
                      align="right"
                      color="#47c758"
                    >
                      ETH{bot.price}
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}

            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
export default Market;
