import fs from 'fs';
import Link from 'next/link';
import path from 'path';

type Params = Promise<{ category: string }>;

export default async function PapersPage({ params }: { params: Params }) {
  const { category } = await params;
  const getPapers = () => {
    const papersDirectory = path.join(
      process.cwd(),
      'public',
      'papers',
      category
    );
    try {
      const files = fs.readdirSync(papersDirectory);
      return files.filter((file) => file.endsWith('.pdf'));
    } catch (error) {
      console.error('Error reading directory:', error);
      return [];
    }
  };

  const papers = getPapers();

  return (
    <div className='min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8 flex items-center gap-4'>
          <Link
            href='/'
            className='text-sm hover:underline flex items-center gap-2'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            뒤로 가기
          </Link>
          <h1 className='text-2xl font-bold'>{category} 논문 목록</h1>
        </div>

        <div className='grid gap-3'>
          {papers.map((paper) => (
            <a
              key={paper}
              href={`/papers/${category}/${paper}`}
              download
              className='p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-3 group'
            >
              <svg
                className='w-5 h-5 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
                />
              </svg>
              <span className='flex-1 group-hover:text-gray-900 dark:group-hover:text-gray-100'>
                {paper}
              </span>
              <span className='text-sm text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 flex items-center gap-1'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                  />
                </svg>
                PDF
              </span>
            </a>
          ))}
        </div>

        {papers.length === 0 && (
          <p className='text-center text-gray-500 mt-8'>
            이 카테고리에 논문이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
