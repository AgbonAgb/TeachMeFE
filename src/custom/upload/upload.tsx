import { ReactComponent as File } from '../../assets/file.svg';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { filesize } from 'filesize';
interface UploadProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label?: string;
	description?: JSX.Element | string;
	allowedFormats?: string[];
	icon?: React.ReactNode;
	fileName?: string;
	fileSize?: number;
}

const Upload: React.FC<UploadProps> = ({
	fileSize,
	fileName,
	label,
	description,
	allowedFormats,
	icon,
	className,
	...rest
}) => {
	return (
		<div className={classNames(styles.container, className)}>
			{label && <label>{label}</label>}
			{description && description}
			<label className={styles.upload}>
				<input type='file' hidden {...rest} />
				{icon || <File />}
				<div>
					<h5 className={styles.fileTitle}>{fileName ? fileName : 'Browse file here'}</h5>
					{fileSize && <p style={{ textAlign: 'center' }}>{filesize(fileSize ?? 0, { base: 10, round: 2 })}</p>}
					{/* <h5 className={styles.fileFormat}>xls,doc,docx,pdf</h5> */}
				</div>
				{allowedFormats && allowedFormats?.length > 0 && <span>{allowedFormats?.join(', ')}</span>}
			</label>
		</div>
	);
};

export default Upload;
