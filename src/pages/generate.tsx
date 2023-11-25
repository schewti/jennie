import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
// sections
import GenerateNormal from 'src/sections/generate/normal';
import GenerateYeekee from 'src/sections/generate/yeekee';

// ----------------------------------------------------------------------

export default function PageGenerate() {
  const params = useParams();

  const { name = 'normal' } = params;

  if (name === 'normal') {
    return <GenerateNormal />;
  }

  if (name === 'yeekee') {
    return <GenerateYeekee />;
  }

  return <GenerateNormal />;
}
