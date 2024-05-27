"""empty message

Revision ID: ff8e06c37e54
Revises: 4c73ac9a60da
Create Date: 2024-05-09 20:47:04.771208

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ff8e06c37e54'
down_revision: Union[str, None] = '4c73ac9a60da'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
