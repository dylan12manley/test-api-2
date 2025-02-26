import express from 'express';
import db from './config/db.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Allows access from anywhere
app.options('*', cors());
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Origin', '*');
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

app.patch('/homePage/:id', async (req, res) => {
  const { id } = req.params;
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
    return res.status(400).send('category title is required for the home page table');
  }

  const [data] = await db.execute(
    'UPDATE homePage SET homeTitle = ?, homeH2 = ?, homeH3 = ?, homeImgUrl = ?, homeImgType = ?, homeText = ?, homeBtnText = ?, homeBtnFunction = ?, hasReviews = ?, selectedReviews = ?, hasCategories = ?, selectedCategories = ?, hasContactForm = ? WHERE homePage.id = ?',
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
      id,
    ]
  );
  res.send({ sucess: data.affectedRows > 0 });
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

app.patch('/general/:id', async (req, res) => {
  const { id } = req.params;
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

  const [data] = await db.execute(
    'UPDATE general SET mainFont = ?, secondaryFont = ?, bg1 = ?, bg2 = ?, bg3 = ?, textColor1 = ?, textColor2 = ?, headerBg = ?, headerTextColor = ?, btn1Bg = ?, btn2Bg = ?, btn1TextColor = ?, btn2TextColor = ?, btn2TextColor = ?, btn1Hover = ?, btn2Hover = ? WHERE general.id = ?',
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
      btn2TextColor,
      btn1Hover,
      btn2Hover,
      id,
    ]
  );
  res.send({ sucess: data.affectedRows > 0 });
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
    addressLine2 = null,
    city = null,
    state = null,
    zip = null,
    phoneNumber = null,
    email = null,
    hours = null,
    license = null,
    facebookUrl = null,
    instagramUrl = null,
    twitterUrl = null,
    youtubeUrl = null,
    linkedinUrl = null,
    companyLogoSmallUrl = null,
    companyLogoLargeUrl = null,
  } = req.body;

  if (!companyName) {
    return res.status(400).send('company name is required for the companyInfo table');
  }

  const [result] = await db.execute(
    'INSERT INTO companyInfo (companyName, address, addressLine2, city, state, zip, phoneNumber, email, hours, license, facebookUrl, instagramUrl, twitterUrl, youtubeUrl, linkedinUrl, companyLogoSmallUrl, companyLogoLargeUrl) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [
      companyName,
      address,
      addressLine2,
      city,
      state,
      zip,
      phoneNumber,
      email,
      hours,
      license,
      facebookUrl,
      instagramUrl,
      twitterUrl,
      youtubeUrl,
      linkedinUrl,
      companyLogoSmallUrl,
      companyLogoLargeUrl,
    ]
  );
  res.send({ sucess: result.affectedRows > 0 });
});

app.get('/companyInfo', async (req, res) => {
  const [results] = await db.execute('SELECT * from companyInfo');
  res.send(results);
});

app.patch('/companyInfo/:id', async (req, res) => {
  const { id } = req.params;
  const {
    companyName,
    address = null,
    addressLine2 = null,
    city = null,
    state = null,
    zip = null,
    phoneNumber = null,
    email = null,
    hours = null,
    license = null,
    facebookUrl = null,
    instagramUrl = null,
    twitterUrl = null,
    youtubeUrl = null,
    linkedinUrl = null,
    companyLogoSmallUrl = null,
    companyLogoLargeUrl = null,
  } = req.body;

  if (!companyName) {
    return res.status(400).send('company name is required for the companyInfo table');
  }

  const [data] = await db.execute(
    'UPDATE companyInfo SET companyName = ?, address = ?, addressLine2 = ?, city = ?, state = ?, zip = ?, phoneNumber = ?, email = ?, hours = ?, license = ?, facebookUrl = ?, instagramUrl = ?, twitterUrl = ?, youtubeUrl = ?, linkedinUrl = ?, companyLogoSmallUrl = ?, companyLogoLargeUrl = ? WHERE companyInfo.id = ?',
    [
      companyName,
      address,
      addressLine2,
      city,
      state,
      zip,
      phoneNumber,
      email,
      hours,
      license,
      facebookUrl,
      instagramUrl,
      twitterUrl,
      youtubeUrl,
      linkedinUrl,
      companyLogoSmallUrl,
      companyLogoLargeUrl,
      id,
    ]
  );
  res.send({ sucess: data.affectedRows > 0 });
});

app.delete('/companyInfo/:id', async (req, res) => {
  const { id } = req.params;
  const [data] = await db.execute('DELETE FROM companyInfo where id =?', [id]);
  res.send({ sucess: data.affectedRows > 0 });
});

app.get('/categories', async (req, res) => {
  const [results] = await db.execute('SELECT * from categories');
  res.send(results);
});

app.post('/categories', async (req, res) => {
  const { catTitle, catImgUrl = null, catSubHeader = null, catText = null } = req.body;

  if (!catTitle) {
    return res.status(400).send('category title is required for the categories table');
  }

  const [result] = await db.execute('INSERT INTO categories (catTitle, catImgUrl, catSubHeader, catText) VALUES (?,?,?,?)', [
    catTitle,
    catImgUrl,
    catSubHeader,
    catText,
  ]);
  res.send({ sucess: result.affectedRows > 0 });
});

app.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const [data] = await db.execute('DELETE FROM categories where id =?', [id]);
  res.send({ sucess: data.affectedRows > 0 });
});

app.patch('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { catTitle, catImgUrl = null, catSubHeader = null, catText = null } = req.body;

  if (!catTitle) {
    return res.status(400).send('category title is required for the categories table');
  }

  const [data] = await db.execute(
    'UPDATE categories SET catTitle = ?, catImgUrl = ?, catSubHeader = ?, catText = ? WHERE categories.id = ?',
    [catTitle, catImgUrl, catSubHeader, catText, id]
  );
  res.send({ sucess: data.affectedRows > 0 });
});

app.get('/categoryArticles', async (req, res) => {
  const [results] = await db.execute('SELECT * from categoryArticles');
  res.send(results);
});

app.post('/categoryArticles', async (req, res) => {
  const {
    articleTitle = null,
    articleStyle = null,
    articleImgUrl1 = null,
    articleImgUrl2 = null,
    articleImgUrl3 = null,
    articleImgUrl4 = null,
    articleImgUrl5 = null,
    articleImgUrl6 = null,
    articleImg1Text = null,
    articleImg2Text = null,
    articleImg3Text = null,
    articleImg4Text = null,
    articleImg5Text = null,
    articleImg6Text = null,
    articleVideo1 = null,
    articleVideo2 = null,
    articleVideo1Thumb = null,
    articleVideo2Thumb = null,
    articleText1 = null,
    articleText2 = null,
    articleText3 = null,
    articleText4 = null,
    articleText5 = null,
    categoryId,
  } = req.body;

  if (!categoryId) {
    return res.status(400).send('category id is required because each article need to belong to a category');
  }

  const [result] = await db.execute(
    'INSERT INTO categoryArticles (articleTitle, articleStyle, articleImgUrl1, articleImgUrl2, articleImgUrl3, articleImgUrl4, articleImgUrl5, articleImgUrl6, articleImg1Text, articleImg2Text, articleImg3Text, articleImg4Text, articleImg5Text, articleImg6Text, articleVideo1, articleVideo2, articleVideo1Thumb, articleVideo2Thumb, articleText1, articleText2, articleText3, articleText4, articleText5, categoryId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [
      articleTitle,
      articleStyle,
      articleImgUrl1,
      articleImgUrl2,
      articleImgUrl3,
      articleImgUrl4,
      articleImgUrl5,
      articleImgUrl6,
      articleImg1Text,
      articleImg2Text,
      articleImg3Text,
      articleImg4Text,
      articleImg5Text,
      articleImg6Text,
      articleVideo1,
      articleVideo2,
      articleVideo1Thumb,
      articleVideo2Thumb,
      articleText1,
      articleText2,
      articleText3,
      articleText4,
      articleText5,
      categoryId,
    ]
  );
  res.send({ sucess: result.affectedRows > 0 });
});

app.patch('/categoryArticles/:id', async (req, res) => {
  const { id } = req.params;
  const {
    articleTitle = null,
    articleStyle = null,
    articleImgUrl1 = null,
    articleImgUrl2 = null,
    articleImgUrl3 = null,
    articleImgUrl4 = null,
    articleImgUrl5 = null,
    articleImgUrl6 = null,
    articleImg1Text = null,
    articleImg2Text = null,
    articleImg3Text = null,
    articleImg4Text = null,
    articleImg5Text = null,
    articleImg6Text = null,
    articleVideo1 = null,
    articleVideo2 = null,
    articleVideo1Thumb = null,
    articleVideo2Thumb = null,
    articleText1 = null,
    articleText2 = null,
    articleText3 = null,
    articleText4 = null,
    articleText5 = null,
    categoryId,
  } = req.body;

  const [data] = await db.execute(
    'UPDATE categoryArticles SET articleTitle = ?, articleStyle = ?, articleImgUrl1 = ?, articleImgUrl2 = ?, articleImgUrl3 = ?, articleImgUrl4 = ?, articleImgUrl5 = ?, articleImgUrl6 = ?, articleImg1Text = ?, articleImg2Text = ?, articleImg3Text = ?, articleImg4Text = ?, articleImg5Text = ?, articleImg6Text = ?, articleVideo1 = ?, articleVideo2 = ?, articleVideo1Thumb = ?, articleVideo2Thumb = ?, articleText1 = ?, articleText2 = ?, articleText3 = ?, articleText4 = ?, articleText5 = ?, categoryId = ? WHERE categoryArticles.id = ?',
    [
      articleTitle,
      articleStyle,
      articleImgUrl1,
      articleImgUrl2,
      articleImgUrl3,
      articleImgUrl4,
      articleImgUrl5,
      articleImgUrl6,
      articleImg1Text,
      articleImg2Text,
      articleImg3Text,
      articleImg4Text,
      articleImg5Text,
      articleImg6Text,
      articleVideo1,
      articleVideo2,
      articleVideo1Thumb,
      articleVideo2Thumb,
      articleText1,
      articleText2,
      articleText3,
      articleText4,
      articleText5,
      categoryId,
      id,
    ]
  );
  res.send({ sucess: data.affectedRows > 0 });
});

app.delete('/categoryArticles/:id', async (req, res) => {
  const { id } = req.params;
  const [data] = await db.execute('DELETE FROM categoryArticles where id =?', [id]);
  res.send({ sucess: data.affectedRows > 0 });
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

app.patch('/headerFooter/:id', async (req, res) => {
  const { id } = req.params;
  const { smallLogoUrl = null, headerElms = null, headerStyle = null, footerElms = null, footerStyle = null } = req.body;

  const [result] = await db.execute(
    'Update headerFooter SET smallLogoUrl = ?, headerElms = ?, headerStyle = ?, footerElms = ?, footerStyle = ? WHERE headerFooter.id = ?',
    [smallLogoUrl, headerElms, headerStyle, footerElms, footerStyle, id]
  );
  res.send({ sucess: result.affectedRows > 0 });
});

app.get('/reviews', async (req, res) => {
  const [results] = await db.execute('SELECT * from reviews');
  res.send(results);
});

app.post('/reviews', async (req, res) => {
  const { reviewTitle = null, reviewScore, reviewText, reviewerName = null, reviewDate } = req.body;

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

app.patch('/reviews/:id', async (req, res) => {
  const { id } = req.params;
  const { reviewTitle = null, reviewScore, reviewText, reviewerName, reviewDate = null } = req.body;

  if (!reviewScore) {
    return res.status(400).send('review score is required for the reviews table');
  }

  if (!reviewText) {
    return res.status(400).send('review text is required for the reviews table');
  }

  if (!reviewerName) {
    return res.status(400).send('reviewer name is required for the reviews table');
  }

  const [data] = await db.execute(
    'UPDATE reviews SET reviewTitle = ?, reviewScore = ?, reviewText = ?, reviewerName = ?, reviewDate = ? WHERE reviews.id = ?',
    [reviewTitle, reviewScore, reviewText, reviewerName, reviewDate, id]
  );
  res.send({ sucess: data.affectedRows > 0 });
});

app.delete('/reviews/:id', async (req, res) => {
  const { id } = req.params;
  const [data] = await db.execute('DELETE FROM reviews where id =?', [id]);
  res.send({ sucess: data.affectedRows > 0 });
});

app.get('/about', async (req, res) => {
  const [results] = await db.execute('SELECT * from about');
  res.send(results);
});

app.post('/about', async (req, res) => {
  const { aboutTitle = null, aboutH2 = null, aboutP = null, aboutImgUrl = null, aboutStyle = null } = req.body;

  const [result] = await db.execute(
    'INSERT INTO about (aboutTitle, aboutH2, aboutP, aboutImgUrl, aboutStyle) VALUES (?,?,?,?,?)',
    [aboutTitle, aboutH2, aboutP, aboutImgUrl, aboutStyle]
  );
  res.send({ sucess: result.affectedRows > 0 });
});

app.patch('/about/:id', async (req, res) => {
  const { id } = req.params;
  const { aboutTitle = null, aboutH2 = null, aboutP = null, aboutImgUrl = null, aboutStyle = null } = req.body;

  const [data] = await db.execute(
    'UPDATE about SET aboutTitle = ?, aboutH2 = ?, aboutP = ?, aboutImgUrl = ?, aboutStyle = ? WHERE about.id = ?',
    [aboutTitle, aboutH2, aboutP, aboutImgUrl, aboutStyle, id]
  );
  res.send({ sucess: data.affectedRows > 0 });
});

app.delete('/about/:id', async (req, res) => {
  const { id } = req.params;
  const [data] = await db.execute('DELETE FROM about where id =?', [id]);
  res.send({ sucess: data.affectedRows > 0 });
});

app.get('/aboutArticles', async (req, res) => {
  const [results] = await db.execute('SELECT * from aboutArticles');
  res.send(results);
});

app.post('/aboutArticles', async (req, res) => {
  const {
    aArtTitle = null,
    aArtP1 = null,
    aArtImgUrl1 = null,
    aArtImg1Text = null,
    aArtP2 = null,
    aArtImgUrl2 = null,
    aArtImg2Text = null,
    aArtP3 = null,
    aArtImgUrl3 = null,
    aArtImg3Text = null,
    aArtP4 = null,
    aArtImgUrl4 = null,
    aArtImg4Text = null,
    aArtImgUrl5 = null,
    aArtImg5Text = null,
    aArtVideo1 = null,
    aArtVideo2 = null,
    aArtVideo1Thumb = null,
    aArtVideo2Thumb = null,
    aArtStyle = null,
    aboutId,
  } = req.body;

  const [result] = await db.execute(
    'INSERT INTO aboutArticles (aArtTitle, aArtP1, aArtImgUrl1, aArtImg1Text, aArtP2, aArtImgUrl2, aArtImg2Text, aArtP3, aArtImgUrl3, aArtImg3Text, aArtP4, aArtImgUrl4, aArtImg4Text, aArtImgUrl5, aArtImg5Text, aArtVideo1, aArtVideo2, aArtVideo1Thumb, aArtVideo2Thumb, aArtStyle, aboutId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [
      aArtTitle,
      aArtP1,
      aArtImgUrl1,
      aArtImg1Text,
      aArtP2,
      aArtImgUrl2,
      aArtImg2Text,
      aArtP3,
      aArtImgUrl3,
      aArtImg3Text,
      aArtP4,
      aArtImgUrl4,
      aArtImg4Text,
      aArtImgUrl5,
      aArtImg5Text,
      aArtVideo1,
      aArtVideo2,
      aArtVideo1Thumb,
      aArtVideo2Thumb,
      aArtStyle,
      aboutId,
    ]
  );
  res.send({ sucess: result.affectedRows > 0 });
});

app.patch('/aboutArticles/:id', async (req, res) => {
  const { id } = req.params;
  const {
    aArtTitle = null,
    aArtP1 = null,
    aArtImgUrl1 = null,
    aArtImg1Text = null,
    aArtP2 = null,
    aArtImgUrl2 = null,
    aArtImg2Text = null,
    aArtP3 = null,
    aArtImgUrl3 = null,
    aArtImg3Text = null,
    aArtP4 = null,
    aArtImgUrl4 = null,
    aArtImg4Text = null,
    aArtImgUrl5 = null,
    aArtImg5Text = null,
    aArtVideo1 = null,
    aArtVideo2 = null,
    aArtVideo1Thumb = null,
    aArtVideo2Thumb = null,
    aArtStyle = null,
    aboutId,
  } = req.body;

  const [data] = await db.execute(
    'UPDATE aboutArticles SET aArtTitle = ?, aArtP1 = ?, aArtImgUrl1 = ?, aArtImg1Text = ?, aArtP2 = ?, aArtImgUrl2 = ?, aArtImg2Text = ?, aArtP3 = ?, aArtImgUrl3 = ?, aArtImg3Text = ?, aArtP4 = ?, aArtImgUrl4 = ?, aArtImg4Text = ?, aArtImgUrl5 = ?, aArtImg5Text = ?, aArtVideo1 = ?, aArtVideo2 = ?, aArtVideo1Thumb = ?, aArtVideo2Thumb = ?, aArtStyle = ?, aboutId = ? WHERE aboutArticles.id = ?',
    [
      aArtTitle,
      aArtP1,
      aArtImgUrl1,
      aArtImg1Text,
      aArtP2,
      aArtImgUrl2,
      aArtImg2Text,
      aArtP3,
      aArtImgUrl3,
      aArtImg3Text,
      aArtP4,
      aArtImgUrl4,
      aArtImg4Text,
      aArtImgUrl5,
      aArtImg5Text,
      aArtVideo1,
      aArtVideo2,
      aArtVideo1Thumb,
      aArtVideo2Thumb,
      aArtStyle,
      aboutId,
      id,
    ]
  );
  res.send({ sucess: data.affectedRows > 0 });
});

app.delete('/aboutArticles/:id', async (req, res) => {
  const { id } = req.params;
  const [data] = await db.execute('DELETE FROM aboutArticles where id =?', [id]);
  res.send({ sucess: data.affectedRows > 0 });
});

app.get('/contact', async (req, res) => {
  const [results] = await db.execute('SELECT * from contact');
  res.send(results);
});

app.post('/contact', async (req, res) => {
  const { contactTitle = null, hasAddress = null, hasMap = null } = req.body;

  const [result] = await db.execute('INSERT INTO contact (contactTitle, hasAddress, hasMap) VALUES (?,?,?)', [
    contactTitle,
    hasAddress,
    hasMap,
  ]);
  res.send({ sucess: result.affectedRows > 0 });
});

app.patch('/contact/:id', async (req, res) => {
  const { id } = req.params;
  const { contactTitle = null, hasAddress = null, hasMap = null } = req.body;

  const [data] = await db.execute('UPDATE contact SET contactTitle = ?, hasAddress = ?, hasMap = ? WHERE contact.id = ?', [
    contactTitle,
    hasAddress,
    hasMap,
    id,
  ]);
  res.send({ sucess: data.affectedRows > 0 });
});

app.delete('/contact/:id', async (req, res) => {
  const { id } = req.params;
  const [data] = await db.execute('DELETE FROM contact where id =?', [id]);
  res.send({ sucess: data.affectedRows > 0 });
});
