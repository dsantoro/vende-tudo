"use client";

import Image from "next/image";
import { request } from "../../lib/datocms";
import styled from "styled-components";

const Container = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const CardTitle = styled.h2`
  margin-bottom: 1rem;
`;

const CustomImage = styled(Image)`
  width: 100%;
  object-fit: cover;
  object-position: center;

  @media (max-width: 600px) {
    height: 300px;
  }
`;

const PRODUCTS_QUERY = `query ProductsPage {
  allProducts {
    id
    title
    images {
      id
      alt
      url
    }
  }
}`;

export default async function AllProducts() {
  const data = await request({
    query: PRODUCTS_QUERY,
  });

  const { allProducts } = data;

  console.log(allProducts);

  return (
    <Container>
      <h1>Helloss</h1>
      <Grid>
        {allProducts.map((item) => {
          return (
            <Card key={item.id}>
              <h1>{item.title}</h1>
              {item.images.map((image) => {
                return (
                  <Image
                    key={image.id}
                    width={300}
                    height={200}
                    src={image.url}
                    alt={image.title || "aa"}
                  />
                );
              })}
            </Card>
          );
        })}
      </Grid>
    </Container>
  );
}
