import { useRouter } from "next/router";
import style from "./[id].module.css";
import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import fetchOneBook from "@/lib/fetch-oneBook";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths : [
      { params : {id : "1"} },
      { params : {id : "2"} },
      { params : {id : "3"} },
    ],
    fallback : true,
    // false : 404 NotFound
    // blocking : ssr
    // true : ssr - fallback status page
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;

  console.log("id : ", id);
  const book = await fetchOneBook(Number(id));

  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  // console.log("router : ", router);
  // console.log("book : ", book);

  // const {id} = router.query;
  // console.log("id[] : ", id)

  if(router.isFallback) {
    return <>
      <Head>
        <title>oneBiteBooks</title>
        <meta property="og:imgage" content="/thumbnail.png" />
        <meta property="og:title" content="oneBiteBooks" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div>로딩 중 입니다...</div>
    </>
  
  } //  로딩 중
  if (!book) {
    // return "문제가 발생했습니다. 다시 시도하세요";
    return {
      notFound : true,
    };
  }
  const { title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:imgage" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={description}
        />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} alt="coverImg" />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
