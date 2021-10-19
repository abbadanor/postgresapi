const express = require("express");
const router = express();

const { Pool } = require("pg");
const pool = new Pool({
  user: "adam",
  host: "postgre-1.cnziulvcf6ew.us-east-1.rds.amazonaws.com",
  database: "postgres",
  password: "password",
  port: 5432,
});

router.get("/", (req, res) => {
  pool.query("SELECT * FROM public.albums", (err, response) => {
    if (err) {
      res.send(err);
      console.log(err);
      return;
    }
    res.send(response.rows);
  });
});

router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  console.log(req.query);

  if (req.params.id) {
    let id = req.params.id;
    pool.query(
      `SELECT * FROM public."albums" WHERE id = ${id}`,
      (err, response) => {
        if (err) {
          res.send(err);
          console.log(err);
          return;
        }
        res.send(response.rows);
      }
    );
  } else
    res.status(400).json({
      message: "No id entered.",
    });
});

router.delete("/:id", (req, res, next) => {
  if (req.params.id) {
    let id = req.params.id;
    pool.query(
      `DELETE FROM public."albums" WHERE id =  ${id}`,
      (err, response) => {
        if (err) {
          res.send(err);
          console.log(err);
          return;
        }
        res.status(200).json({
          message: "Removed",
          id: req.params.id,
        });
      }
    );
  }
});

router.post("/", (req, res, next) => {
  //Vill man kan man samla alla req.body... i en variabel som nedan. Då behöver man bara skriva player.name istället för req.body.name när man vill använd värdet.
  // const player={
  //     name: req.body.name,
  //     birthdate: req.body.birthdate
  //     ....
  // }
  // Exempel nedan, i min db så autoskapas id, därav matas det inte in när jag kör post. Har man inte auto id så lägg till detta...  "id":"1",
  // {"name":"Ove Andre","birthdate":"1992-02-09T23:00:00.000Z","points":12,"description":"Paddelkungen från kungsan! ","team_id":"1"}

  pool.query(
    `INSERT INTO public."players" (title, artist, year, cover, summary) VALUES ('${req.body.title}'::character varying, '${req.body.artist}'::character varying, '${req.body.year}'::bigint, '${req.body.cover}'::character varying, '${req.body.summary}'::character varying)`,
    (err, response) => {
      if (err) {
        res.send(err);
        console.log(err);
        return;
      }
      res.status(200).json({
        message: "New album added",
      });
      // console.log(response.rows[0].name);
      //         console.log(response);
    }
  );
});

module.exports = router;
