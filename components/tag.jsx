import Link from '@/components/link';
import kebabCase from '@/lib/utils/kebabCase';

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium text-sky-500 dark:text-sky-400">
        #{text.split(' ').join('-')}
      </a>
    </Link>
  );
};

export default Tag;
