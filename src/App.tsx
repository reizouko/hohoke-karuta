import React, { useState } from 'react';
import './App.css';
import { Box, Button, Card, CardActions, CardContent, Container, CssBaseline, makeStyles, Typography } from '@material-ui/core';
import { default as Sound } from 'react-sound';
import { default as shuffle } from 'shuffle-array';

const readingFiles = [
  "02_ONE_留守番電話の擬人化キ….wav",
  "03_ONE_発信者番号表示サービ….wav",
  "04_ONE_自動警告録音装置の擬….wav",
  "05_ONE_迷惑電話自動判別装置….wav",
  "06_ONE_名前の由来は「知らな….wav",
  "07_ONE_みかんが大好きな、民….wav",
  "08_ONE_北海道犬から、｜皆《….wav",
  "09_ONE_アナタの食生活をサポ….wav",
  "10_ONE_（わたさぬーにゃ）で….wav",
  "11_ONE_ぺたぺた系クラウドス….wav",
  "12_ONE_銚子ウッド村ファーム….wav",
  "13_ONE_松本市生まれの子供が….wav",
  "14_ONE_松本市生まれのアマガ….wav",
  "15_ONE_松本市生まれのダンス….wav",
  "16_ONE_黒猫の擬人化娘。仲間….wav",
  "17_ONE_かけものつぐみ：掛軸….wav",
  "18_ONE_ひめかきふみか：姫路….wav",
  "19_ONE_ヒツジとウサギのハー….wav",
  "20_ONE_栃木県で活躍する応援….wav",
  "21_ONE_『鬼っ子ハンターつい….wav",
  "22_ONE_ついなちゃんが｜被《….wav",
  "23_ONE_ついなちゃんのお供の….wav",
  "24_ONE_ついなちゃんのお供の….wav",
  "25_ONE_スマートフォンの擬人….wav",
];

const range = (length: number): Array<number> => [...Array(length)].map((_, i) => i);

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    '& > *': {
      margin: theme.spacing(1),
      padding: theme.spacing(5)
    }
  },
  cardContent: {
    textAlign: "center"
  },
  cardButton: {
    justifyContent: "center"
  },
  cards: {
    fontWeight: "bold"
  }
}));

export default () => {

  const [readingStep, setReadingStep] = useState<"READY" | "SENTENCE" | "END">("READY");
  const [shuffledVoiceIndices, setShuffledVoiceIndices] = useState<Array<number>>([]);

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline/>
      <div className={classes.paper}>
        <Typography variant="h5">ほーほけカルタ、読みます。</Typography>
        <Card>
          <CardContent className={classes.cardContent}>
            <Box>
              <Typography variant="h6">
                残り <span className={classes.cards}>{shuffledVoiceIndices.length}</span> 枚
              </Typography>
            </Box>
            <Box marginTop={3}>
              <Typography>
                絵札を並べてから
              </Typography>
              <Typography>
                ↓
              </Typography>
            </Box>
          </CardContent>
          <CardActions className={classes.cardButton}>
            <Button variant="contained" color="primary" onClick={() => {
              setReadingStep("READY");
              setShuffledVoiceIndices(shuffle(range(readingFiles.length)));
            }} disabled={shuffledVoiceIndices.length > 0}>スタート</Button>
          </CardActions>
        </Card>
        <Sound
          url={`${process.env.PUBLIC_URL}/voice/00_ONE_それじゃあ、いくよー….wav`}
          playStatus={shuffledVoiceIndices.length > 0 && readingStep === "READY" ? "PLAYING" : "STOPPED"}
          onFinishedPlaying={() => {
            setTimeout(() => {
              setReadingStep("SENTENCE");
            }, 3000);
          }}
        />
        <Sound
          url={`${process.env.PUBLIC_URL}/voice/01_ONE_取れたかな？.wav`}
          playStatus={shuffledVoiceIndices.length > 0 && readingStep === "END" ? "PLAYING" : "STOPPED"}
          onFinishedPlaying={() => {
            setTimeout(() => {
              setReadingStep("READY");
              setShuffledVoiceIndices(shuffledVoiceIndices.slice(1));
            }, 3000);
          }}
        />
        {
          readingFiles.map((fileName, index) =>
            <Sound
              url={`${process.env.PUBLIC_URL}/voice/${fileName}`}
              playStatus={shuffledVoiceIndices.length > 0 && readingStep === "SENTENCE" && shuffledVoiceIndices[0] === index ? "PLAYING" : "STOPPED"}
              onFinishedPlaying={() => {
                setTimeout(() => {
                  setReadingStep("END");
                }, 5000);
              }}
            />
          )
        }
      </div>
    </Container>
  );
}
