import { Box, Container, Typography } from "@mui/material";
import { GetStaticProps } from 'next'
import Avatar from "avataaars";
import { getContentfulClient } from "../lib/contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

interface IntroContent {
  headline: string,
  subHeadline: string,
  introText: any,
}

interface HomeProps {
  introContent: IntroContent,
}

export default function Home(props: HomeProps) {
  return (
    <Container>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "90vh",
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          rowGap: "25px",
        }}>
          <Typography variant="h1" sx={{fontWeight: "400"}}>{props.introContent.headline}</Typography>
          <Typography variant="h3">{props.introContent.subHeadline}</Typography>
          {documentToReactComponents(
            props.introContent.introText,
            {
              renderNode: {
                [BLOCKS.PARAGRAPH]: (_node, children) => <Typography variant="h6">{children}</Typography>
              }
            }
          )}
        </Box>
        <Box sx={{
          display: {
            xs: "none",
            md: "flex",
          }
        }}>
          <Avatar
            avatarStyle='Circle'
            topType='ShortHairShortFlat'
            accessoriesType='Prescription02'
            hairColor='BrownDark'
            facialHairType='BeardLight'
            facialHairColor='BrownDark'
            clotheType='Hoodie'
            clotheColor='Blue03'
            eyeType='Happy'
            eyebrowType='Default'
            mouthType='Smile'
            skinColor='Light'
            style={{width: '400px', height: '400px'}}
          />
        </Box>
      </Box>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  console.log("HERE!!!");
  const client = getContentfulClient();
  try {
    const response = await client.getEntries({
      content_type: "intro",
      limit: 1,
    });
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
    return {
      props: {
        introContent: response.items[0].fields,
      }
    }
  } catch(e: any) {
    console.log(`error retrieving intro content from contentful: ${e.message}`);
    throw e;
  }
}
