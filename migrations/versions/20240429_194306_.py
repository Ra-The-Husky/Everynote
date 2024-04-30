"""empty message

Revision ID: f324aa22a40d
Revises: 4de7ced605a2
Create Date: 2024-04-29 19:43:06.780434

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f324aa22a40d'
down_revision = '4de7ced605a2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('notebooks', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])

    with op.batch_alter_table('notes', schema=None) as batch_op:
        batch_op.alter_column('caption',
               existing_type=sa.VARCHAR(length=50),
               nullable=True)
        batch_op.alter_column('date_created',
               existing_type=sa.DATE(),
               nullable=True)
        batch_op.create_foreign_key(None, 'notebooks', ['notebook_id'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('notes', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.alter_column('date_created',
               existing_type=sa.DATE(),
               nullable=False)
        batch_op.alter_column('caption',
               existing_type=sa.VARCHAR(length=50),
               nullable=False)

    with op.batch_alter_table('notebooks', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')

    # ### end Alembic commands ###