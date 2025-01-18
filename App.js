import express from 'express';
import db from './config/db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
  express.json();
});

app.post('/posts', async (req, res) => {
  const { title, content, category = null } = req.body;

  if (!title && !content) {
    return res.status(400).send('please send title and content');
  }

  if (!title) {
    return res.status(400).send('please send title for post');
  }

  if (!content) {
    return res.status(400).send('please send content for post');
  }

  const [result] = await db.execute('INSERT INTO posts (title, content, category) VALUES (?,?,?)', [title, content, category]);
  res.send({ sucess: result.affectedRows > 0 });
});

app.get('/posts', async (req, res) => {
  const [results] = await db.execute('SELECT * from posts');
  res.send(results);
});

app.patch('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).send('please send title');
  }

  const [data] = await db.execute('UPDATE posts SET title = ? WHERE id = ?', [title, id]);
  res.send({ sucess: data.affectedRows > 0 });
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const [data] = await db.execute('DELETE FROM posts where postID =?', [id]);
  res.send({ sucess: data.affectedRows > 0 });
});

// USERS
app.get('/users', async (req, res) => {
  const [results] = await db.execute('SELECT * from users');
  res.send(results);
});

// CODING
app.get('/coding', async (req, res) => {
  const [results] = await db.execute('SELECT * from users');
  res.send(results);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//
// FOR JAYA-APP-DB
// HOME PAGE
app.get('/homePage', async (req, res) => {
  const [results] = await db.execute('SELECT * from homePage');
  res.send(results);
});

app.post('/homePage', async (req, res) => {
  const {
    homeTitle,
    homeH2 = null,
    homeH3 = null,
    homeImgUrl = null,
    homeImgType = null,
    homeText = null,
    homeBtnText = null,
    homeBtnFunction = null,
    hasReviews = null,
    selectedReviews = null,
    hasCategories = null,
    selectedCategories = null,
    hasContactForm = null,
  } = req.body;

  if (!homeTitle) {
    return res.status(400).send('homeTitle is required for the homePage table');
  }

  const [result] = await db.execute(
    'INSERT INTO homePage (homeTitle, homeH2, homeH3, homeImgUrl, homeImgType, homeText, homeBtnText, homeBtnFunction, hasReviews, selectedReviews, hasCategories, selectedCategories, hasContactForm) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [
      homeTitle,
      homeH2,
      homeH3,
      homeImgUrl,
      homeImgType,
      homeText,
      homeBtnText,
      homeBtnFunction,
      hasReviews,
      selectedReviews,
      hasCategories,
      selectedCategories,
      hasContactForm,
    ]
  );
  res.send({ sucess: result.affectedRows > 0 });
});

app.delete('/homePage/:id', async (req, res) => {
  const { id } = req.params;
  const [data] = await db.execute('DELETE FROM homePage where id =?', [id]);
  res.send({ sucess: data.affectedRows > 0 });
});

app.post('/general', async (req, res) => {
  const {
    mainFont = null,
    secondaryFont = null,
    bg1 = null,
    bg2 = null,
    bg3 = null,
    textColor1 = null,
    textColor2 = null,
    headerBg = null,
    headerTextColor = null,
    btn1Bg = null,
    btn2Bg = null,
    btn1TextColor = null,
    btn2TextColor = null,
    btn1Hover = null,
    btn2Hover = null,
  } = req.body;

  const [result] = await db.execute(
    'INSERT INTO general (mainFont, secondaryFont, bg1, bg2, bg3, textColor1, textColor2, headerBg, headerTextColor, btn1Bg, btn2Bg, btn1TextColor, btn2TextColor, btn1Hover, btn2Hover) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [
      mainFont,
      secondaryFont,
      bg1,
      bg2,
      bg3,
      textColor1,
      textColor2,
      headerBg,
      headerTextColor,
      btn1Bg,
      btn2Bg,
      btn1TextColor,
      btn2TextColor,
      btn1Hover,
      btn2Hover,
    ]
  );
  res.send({ sucess: result.affectedRows > 0 });
});

app.get('/general', async (req, res) => {
  const [results] = await db.execute('SELECT * from general');
  res.send(results);
});

app.delete('/general/:id', async (req, res) => {
  const { id } = req.params;
  const [data] = await db.execute('DELETE FROM general where id =?', [id]);
  res.send({ sucess: data.affectedRows > 0 });
});

app.post('/companyInfo', async (req, res) => {
  const {
    companyName,
    address = null,
    city = null,
    state = null,
    zip = null,
    phoneNumber = null,
    email = null,
    hours = null,
    facebookUrl = null,
    instagramUrl = null,
    twitterUrl = null,
    youtubeUrl = null,
    linkedinUrl = null,
  } = req.body;

  if (!companyName) {
    return res.status(400).send('company name is required for the companyInfo table');
  }

  const [result] = await db.execute(
    'INSERT INTO companyInfo (companyName, address, city, state, zip, phoneNumber, email, hours, facebookUrl, instagramUrl, twitterUrl, youtubeUrl, linkedinUrl) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [
      companyName,
      address,
      city,
      state,
      zip,
      phoneNumber,
      email,
      hours,
      facebookUrl,
      instagramUrl,
      twitterUrl,
      youtubeUrl,
      linkedinUrl,
    ]
  );
  res.send({ sucess: result.affectedRows > 0 });
});

app.get('/categories', async (req, res) => {
  const [results] = await db.execute('SELECT * from categories');
  res.send(results);
});

app.post('/categories', async (req, res) => {
  const { catTitle, catImgUrl = null, catSubHeader = null, catText = null, articles = null } = req.body;

  if (!catTitle) {
    return res.status(400).send('category title is required for the categories table');
  }

  const [result] = await db.execute(
    'INSERT INTO categories (catTitle, catImgUrl, catSubHeader, catText, articles) VALUES (?,?,?,?,?)',
    [catTitle, catImgUrl, catSubHeader, catText, articles]
  );
  res.send({ sucess: result.affectedRows > 0 });
});

app.get('/categoryArticles', async (req, res) => {
  const [results] = await db.execute('SELECT * from categoryArticles');
  res.send(results);
});

app.post('/categoryArticles', async (req, res) => {
  const {
    articleTitle = null,
    articleStyle = null,
    articleImgUrlOne = null,
    articleImgUrlTwo = null,
    articleImgUrlThree = null,
    articleTextOne = null,
    articleTextTwo = null,
    articleTextThree = null,
  } = req.body;

  const [result] = await db.execute(
    'INSERT INTO categoryArticles (articleTitle, articleStyle, articleImgUrlOne, articleImgUrlTwo, articleImgUrlThree, articleTextOne, articleTextTwo, articleTextThree) VALUES (?,?,?,?,?,?,?,?)',
    [
      articleTitle,
      articleStyle,
      articleImgUrlOne,
      articleImgUrlTwo,
      articleImgUrlThree,
      articleTextOne,
      articleTextTwo,
      articleTextThree,
    ]
  );
  res.send({ sucess: result.affectedRows > 0 });
});

app.get('/headerFooter', async (req, res) => {
  const [results] = await db.execute('SELECT * from headerFooter');
  res.send(results);
});

app.post('/headerFooter', async (req, res) => {
  const { smallLogoUrl = null, headerElms = null, headerStyle = null, footerElms = null, footerStyle = null } = req.body;

  const [result] = await db.execute(
    'INSERT INTO headerFooter (smallLogoUrl, headerElms, headerStyle, footerElms, footerStyle) VALUES (?,?,?,?,?)',
    [smallLogoUrl, headerElms, headerStyle, footerElms, footerStyle]
  );
  res.send({ sucess: result.affectedRows > 0 });
});

app.get('/reviews', async (req, res) => {
  const [results] = await db.execute('SELECT * from reviews');
  res.send(results);
});

app.post('/reviews', async (req, res) => {
  const { reviewTitle = null, reviewScore, reviewText = null, reviewerName = null, reviewDate } = req.body;

  if (!reviewScore) {
    return res.status(400).send('review score is required for the reviews table');
  }

  if (!reviewText) {
    return res.status(400).send('review text is required for the reviews table');
  }

  if (!reviewerName) {
    return res.status(400).send('reviewer name is required for the reviews table');
  }

  const [result] = await db.execute(
    'INSERT INTO reviews (reviewTitle, reviewScore, reviewText, reviewerName, reviewDate) VALUES (?,?,?,?,?)',
    [reviewTitle, reviewScore, reviewText, reviewerName, reviewDate]
  );
  res.send({ sucess: result.affectedRows > 0 });
});
